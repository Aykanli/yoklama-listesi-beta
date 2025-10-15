import React, { useState, useEffect } from 'react';
import { Camera, CheckCircle, Users, QrCode, BarChart, Download, LogOut, UserPlus, MapPin, AlertTriangle, X } from 'lucide-react';

const YoklamaSistemi = () => {
  const [view, setView] = useState('login');
  const [currentUser, setCurrentUser] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [qrToken, setQrToken] = useState('');
  const [qrExpiry, setQrExpiry] = useState(null);
  const [message, setMessage] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [userLocation, setUserLocation] = useState(null);
  const [showInvalidateModal, setShowInvalidateModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  
  // Yeni öğrenci ekleme için
  const [registerView, setRegisterView] = useState(false);
  const [registerName, setRegisterName] = useState('');
  const [registerSurname, setRegisterSurname] = useState('');
  const [registerNo, setRegisterNo] = useState('');
  const [registerCode, setRegisterCode] = useState('');

  // YAŞAR ÜNİVERSİTESİ KAMPÜS KONUMU
  const classLocation = {
    lat: 38.454113,
    lng: 27.202612,
    radius: 100,  // 100 metre yarıçap
    name: 'Yaşar Üniversitesi, Selçuk Yaşar Kampüsü'
  };

  const [students, setStudents] = useState([
    { id: 1, no: '18070003013', ad: 'İBRAHİM', soyad: 'GÜLTEKİN', bolum: 'İNŞAAT MÜH.', team: 1, email: '18070003013@ogrenci.edu.tr', yoklamalar: [] },
    { id: 2, no: '19070001053', ad: 'ELİF EMİNE', soyad: 'GÜNAL', bolum: 'BİLGİSAYAR MÜH.', team: 2, email: '19070001053@ogrenci.edu.tr', yoklamalar: [] },
    { id: 3, no: '19070008012', ad: 'ERK YANKI', soyad: 'URAL', bolum: 'MAKİNE MÜH.', team: 2, email: '19070008012@ogrenci.edu.tr', yoklamalar: [] },
    { id: 4, no: '20070001057', ad: 'ERCE', soyad: 'ÖZKAN', bolum: 'BİLGİSAYAR MÜH.', team: 5, email: '20070001057@ogrenci.edu.tr', yoklamalar: [] },
    { id: 5, no: '20070002048', ad: 'İPEK', soyad: 'ATIŞ', bolum: 'ENDÜSTRİ MÜH.', team: 7, email: '20070002048@ogrenci.edu.tr', yoklamalar: [] },
    { id: 6, no: '20070007004', ad: 'İDİL ECE', soyad: 'CEVAHİR', bolum: 'ENERJİ SİSTEMLERİ MÜH.', team: 7, email: '20070007004@ogrenci.edu.tr', yoklamalar: [] },
    { id: 7, no: '20070008016', ad: 'SUDE', soyad: 'ONFİDAN', bolum: 'MAKİNE MÜH.', team: 6, email: '20070008016@ogrenci.edu.tr', yoklamalar: [] },
    { id: 8, no: '20070008017', ad: 'ÖMER', soyad: 'ARICA', bolum: 'MAKİNE MÜH.', team: 2, email: '20070008017@ogrenci.edu.tr', yoklamalar: [] },
    { id: 9, no: '20070008019', ad: 'SELİM MERT', soyad: 'KIRCAALİLİ', bolum: 'MAKİNE MÜH.', team: 6, email: '20070008019@ogrenci.edu.tr', yoklamalar: [] },
    { id: 10, no: '20070008029', ad: 'BERİL DERAN', soyad: 'GÜRBÜZ', bolum: 'MAKİNE MÜH.', team: 4, email: '20070008029@ogrenci.edu.tr', yoklamalar: [] },
    { id: 11, no: '21070001004', ad: 'ALİ HAKTAN', soyad: 'SIĞIN', bolum: 'BİLGİSAYAR MÜH.', team: 12, email: '21070001004@ogrenci.edu.tr', yoklamalar: [] },
    { id: 12, no: '21070001051', ad: 'ARDA', soyad: 'ALTUNHAN', bolum: 'BİLGİSAYAR MÜH.', team: 5, email: '21070001051@ogrenci.edu.tr', yoklamalar: [] },
    { id: 13, no: '21070001070', ad: 'EKREM', soyad: 'TEMEL', bolum: 'BİLGİSAYAR MÜH.', team: 5, email: '21070001070@ogrenci.edu.tr', yoklamalar: [] },
    { id: 14, no: '21070002005', ad: 'NESRİN', soyad: 'ŞENTÜRK', bolum: 'ENDÜSTRİ MÜH.', team: 11, email: '21070002005@ogrenci.edu.tr', yoklamalar: [] },
    { id: 15, no: '21070002025', ad: 'BATUHAN', soyad: 'ŞİŞMAN', bolum: 'ENDÜSTRİ MÜH.', team: 11, email: '21070002025@ogrenci.edu.tr', yoklamalar: [] },
    { id: 16, no: '21070005027', ad: 'KIVANÇ EFE', soyad: 'ERGÖNÜL', bolum: 'ELEKTRİK-ELEKTRONİK MÜH.', team: 2, email: '21070005027@ogrenci.edu.tr', yoklamalar: [] },
    { id: 17, no: '21070005030', ad: 'OĞUZ', soyad: 'KOYUCAN', bolum: 'ELEKTRİK-ELEKTRONİK MÜH.', team: 8, email: '21070005030@ogrenci.edu.tr', yoklamalar: [] },
    { id: 18, no: '21070005042', ad: 'ZEYNEP', soyad: 'ARSLANBUĞA', bolum: 'ELEKTRİK-ELEKTRONİK MÜH.', team: 2, email: '21070005042@ogrenci.edu.tr', yoklamalar: [] },
    { id: 19, no: '21070007001', ad: 'BESTE', soyad: 'TEKİN', bolum: 'ENERJİ SİSTEMLERİ MÜH.', team: 7, email: '21070007001@ogrenci.edu.tr', yoklamalar: [] },
    { id: 20, no: '21070007004', ad: 'EKİN', soyad: 'ALTUNKAYA', bolum: 'ENERJİ SİSTEMLERİ MÜH.', team: 10, email: '21070007004@ogrenci.edu.tr', yoklamalar: [] },
    { id: 21, no: '21070008009', ad: 'EMRE', soyad: 'ERİŞİR', bolum: 'MAKİNE MÜH.', team: 8, email: '21070008009@ogrenci.edu.tr', yoklamalar: [] },
    { id: 22, no: '21070008014', ad: 'İSMAİL CANBERK', soyad: 'DEMİRKAN', bolum: 'MAKİNE MÜH.', team: 3, email: '21070008014@ogrenci.edu.tr', yoklamalar: [] },
    { id: 23, no: '21070008016', ad: 'CAN', soyad: 'GİRGİN', bolum: 'MAKİNE MÜH.', team: 9, email: '21070008016@ogrenci.edu.tr', yoklamalar: [] },
    { id: 24, no: '21070008017', ad: 'KEREM', soyad: 'EROĞLU', bolum: 'MAKİNE MÜH.', team: 1, email: '21070008017@ogrenci.edu.tr', yoklamalar: [] },
    { id: 25, no: '21070008027', ad: 'ARMAĞAN', soyad: 'SOYLU', bolum: 'MAKİNE MÜH.', team: 4, email: '21070008027@ogrenci.edu.tr', yoklamalar: [] },
    { id: 26, no: '21070008033', ad: 'ALP SERKAN', soyad: 'MERKİT', bolum: 'MAKİNE MÜH.', team: 8, email: '21070008033@ogrenci.edu.tr', yoklamalar: [] },
    { id: 27, no: '21070008034', ad: 'ATAKAN', soyad: 'DİNÇER', bolum: 'MAKİNE MÜH.', team: 3, email: '21070008034@ogrenci.edu.tr', yoklamalar: [] },
    { id: 28, no: '21070008206', ad: 'DEMET', soyad: 'BÜYÜKTAŞ', bolum: 'MAKİNE MÜH.', team: 4, email: '21070008206@ogrenci.edu.tr', yoklamalar: [] },
    { id: 29, no: '22070001041', ad: 'GÜRKAN', soyad: 'EROĞLU', bolum: 'BİLGİSAYAR MÜH.', team: 1, email: '22070001041@ogrenci.edu.tr', yoklamalar: [] },
    { id: 30, no: '22070001055', ad: 'EMRE EFE', soyad: 'YÜKSEL', bolum: 'BİLGİSAYAR MÜH.', team: 12, email: '22070001055@ogrenci.edu.tr', yoklamalar: [] },
    { id: 31, no: '22070002015', ad: 'SÜLEYMAN BATU', soyad: 'SARI', bolum: 'ENDÜSTRİ MÜH.', team: 10, email: '22070002015@ogrenci.edu.tr', yoklamalar: [] },
    { id: 32, no: '22070002047', ad: 'KADİR EMRE', soyad: 'GÜNEŞ', bolum: 'ENDÜSTRİ MÜH.', team: 10, email: '22070002047@ogrenci.edu.tr', yoklamalar: [] },
    { id: 33, no: '22070005040', ad: 'TOPRAK', soyad: 'TUNCER', bolum: 'ELEKTRİK-ELEKTRONİK MÜH.', team: 6, email: '22070005040@ogrenci.edu.tr', yoklamalar: [] },
    { id: 34, no: '22070005053', ad: 'EMRE CAN', soyad: 'HEKİMOĞLU', bolum: 'ELEKTRİK-ELEKTRONİK MÜH.', team: 6, email: '22070005053@ogrenci.edu.tr', yoklamalar: [] },
    { id: 35, no: '22070007014', ad: 'ILGAR', soyad: 'ŞENOL', bolum: 'ENERJİ SİSTEMLERİ MÜH.', team: 10, email: '22070007014@ogrenci.edu.tr', yoklamalar: [] },
    { id: 36, no: '22070008017', ad: 'EDA NUR', soyad: 'ÇALIŞKAN', bolum: 'MAKİNE MÜH.', team: 9, email: '22070008017@ogrenci.edu.tr', yoklamalar: [] },
    { id: 37, no: '22070008021', ad: 'SAMİ BERK', soyad: 'ŞAHİN', bolum: 'MAKİNE MÜH.', team: 3, email: '22070008021@ogrenci.edu.tr', yoklamalar: [] },
    { id: 38, no: '22070008026', ad: 'DENİZ', soyad: 'ÜNVER', bolum: 'MAKİNE MÜH.', team: 9, email: '22070008026@ogrenci.edu.tr', yoklamalar: [] },
    { id: 39, no: '22070008034', ad: 'AYKAN', soyad: 'KANLI', bolum: 'MAKİNE MÜH.', team: 4, email: '22070008034@ogrenci.edu.tr', yoklamalar: [] },
    { id: 40, no: '22070008043', ad: 'DENİZ', soyad: 'KARATEPE', bolum: 'MAKİNE MÜH.', team: 9, email: '22070008043@ogrenci.edu.tr', yoklamalar: [] },
    { id: 41, no: '22070003022', ad: 'AYŞEGÜL', soyad: 'KARINYARICI', bolum: 'İNŞAAT MÜH.', team: 1, email: '22070003022@ogrenci.edu.tr', yoklamalar: [] },
    { id: 42, no: '21070001046', ad: 'AHMET ÖZGÜR', soyad: 'KORKMAZ', bolum: 'BİLGİSAYAR MÜH.', team: 12, email: '21070001046@ogrenci.edu.tr', yoklamalar: [] }
  ]);

  const dersInfo = { dersKodu: 'YZ301', dersAdi: 'Yapay Zeka', toplamHafta: 14 };

  // Konum izni ve kontrol
  const checkLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject('Tarayıcınız konum özelliğini desteklemiyor.');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          
          // Haversine formülü ile mesafe hesaplama (metre)
          const R = 6371e3;
          const φ1 = classLocation.lat * Math.PI / 180;
          const φ2 = userLat * Math.PI / 180;
          const Δφ = (userLat - classLocation.lat) * Math.PI / 180;
          const Δλ = (userLng - classLocation.lng) * Math.PI / 180;

          const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                    Math.cos(φ1) * Math.cos(φ2) *
                    Math.sin(Δλ/2) * Math.sin(Δλ/2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
          const distance = R * c;

          setUserLocation({ lat: userLat, lng: userLng, distance: distance.toFixed(0) });
          
          if (distance <= classLocation.radius) {
            resolve(true);
          } else {
            reject(`Yaşar Üniversitesi kampüsüne çok uzaksınız!\n\nMesafe: ${distance.toFixed(0)} metre\nİzin verilen: ${classLocation.radius} metre\n\nYoklamaya sadece kampüsten katılabilirsiniz.`);
          }
        },
        (error) => {
          reject('Konum izni vermeniz gerekiyor! Tarayıcınızın konum ayarlarını kontrol edin.');
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    });
  };

  useEffect(() => {
    if (qrExpiry) {
      const timer = setInterval(() => {
        const remaining = Math.max(0, Math.floor((qrExpiry - new Date()) / 1000));
        setTimeLeft(remaining);
        if (remaining === 0) setQrToken('');
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [qrExpiry]);

  const handleLogin = () => {
    if (loginEmail === 'hoca@universite.edu.tr') {
      setCurrentUser({ role: 'teacher', name: 'Öğretim Üyesi' });
      setView('teacher');
      setMessage('');
    } else if (loginEmail.includes('@ogrenci.edu.tr')) {
      const student = students.find(s => s.email === loginEmail);
      if (student) {
        setCurrentUser({ role: 'student', ...student });
        setView('student');
        setMessage('');
      } else {
        setMessage('❌ Bu email sistemde kayıtlı değil!');
      }
    } else {
      setMessage('❌ Lütfen okul email adresi kullanın!');
    }
  };

  const handleRegister = async () => {
    if (!registerName || !registerSurname || !registerNo) {
      setMessage('❌ Lütfen tüm bilgileri giriniz!');
      return;
    }
    
    if (!qrToken || new Date() > qrExpiry) {
      setMessage('❌ Geçerli QR kod yok! Hoca henüz QR kod oluşturmadı.');
      return;
    }

    if (registerCode !== qrToken) {
      setMessage('❌ Girdiğiniz kod yanlış!');
      return;
    }

    // KONUM KONTROLÜ - YAŞAR ÜNİVERSİTESİ KAMPÜSÜNDEN 100M İÇİNDE OLMALI
    setMessage('📍 Konumunuz kontrol ediliyor...');
    try {
      await checkLocation();
    } catch (error) {
      setMessage('❌ ' + error);
      return;
    }

    // Öğrenci kontrolü
    const exists = students.find(s => 
      s.ad.toLowerCase() === registerName.toLowerCase() && 
      s.soyad.toLowerCase() === registerSurname.toLowerCase() &&
      s.no === registerNo
    );

    if (exists) {
      if (exists.yoklamalar.includes(currentWeek)) {
        setMessage('⚠️ Bu hafta zaten yoklamaya katıldınız!');
        return;
      }
      
      const updatedStudents = students.map(s => 
        s.id === exists.id ? { ...s, yoklamalar: [...s.yoklamalar, currentWeek].sort((a,b) => a-b) } : s
      );
      setStudents(updatedStudents);
      setMessage('✅ Yoklamanız kaydedildi, ' + exists.ad + ' ' + exists.soyad + '!\n📍 Konum: Kampüsten ' + userLocation.distance + 'm içinde');
      setRegisterName('');
      setRegisterSurname('');
      setRegisterNo('');
      setRegisterCode('');
    } else {
      setMessage('❌ Bilgileriniz sistemde bulunamadı! Öğrenci no, ad ve soyadınızı kontrol edin.');
    }
  };

  const generateQRCode = () => {
    const token = 'QR' + Math.random().toString(36).substr(2, 6).toUpperCase();
    const expiry = new Date(Date.now() + 10 * 60 * 1000);
    setQrToken(token);
    setQrExpiry(expiry);
    setMessage('✅ QR Kod oluşturuldu! Öğrenciler kodu girmeye başlayabilir.');
  };

  const handleAttendance = async () => {
    if (!qrToken || new Date() > qrExpiry) {
      setMessage('❌ Geçerli QR kod yok!');
      return;
    }
    
    // KONUM KONTROLÜ
    setMessage('📍 Konumunuz kontrol ediliyor...');
    try {
      await checkLocation();
    } catch (error) {
      setMessage('❌ ' + error);
      return;
    }

    if (currentUser.yoklamalar.includes(currentWeek)) {
      setMessage('⚠️ Bu hafta zaten yoklamaya katıldınız!');
      return;
    }
    
    const updatedStudents = students.map(s => 
      s.email === currentUser.email ? { ...s, yoklamalar: [...s.yoklamalar, currentWeek].sort((a,b) => a-b) } : s
    );
    setStudents(updatedStudents);
    setCurrentUser({...currentUser, yoklamalar: [...currentUser.yoklamalar, currentWeek].sort((a,b) => a-b)});
    setMessage('✅ Yoklamanız başarıyla kaydedildi!\n📍 Mesafe: ' + userLocation.distance + 'm');
  };

  // HOCA - Yoklamayı Geçersiz Kılma
  const invalidateAttendance = (student) => {
    setSelectedStudent(student);
    setShowInvalidateModal(true);
  };

  const confirmInvalidate = () => {
    const updatedStudents = students.map(s => {
      if (s.id === selectedStudent.id) {
        const newYoklamalar = s.yoklamalar.filter(h => h !== currentWeek);
        return { ...s, yoklamalar: newYoklamalar };
      }
      return s;
    });
    setStudents(updatedStudents);
    setMessage(`✅ ${selectedStudent.ad} ${selectedStudent.soyad} öğrencisinin ${currentWeek}. hafta yoklaması geçersiz sayıldı!`);
    setShowInvalidateModal(false);
    setSelectedStudent(null);
  };

  const calculateAttendance = (student) => {
    const rate = (student.yoklamalar.length / dersInfo.toplamHafta) * 100;
    const remaining = dersInfo.toplamHafta - currentWeek;
    const maxPossible = student.yoklamalar.length + remaining;
    const maxRate = (maxPossible / dersInfo.toplamHafta) * 100;
    
    let status = 'VAR', color = 'bg-green-100 text-green-800', rowColor = '';
    if (rate < 70) {
      status = 'YOK';
      color = 'bg-red-100 text-red-800';
      rowColor = 'bg-red-50';
    } else if (maxRate < 75) {
      rowColor = 'bg-orange-50';
    }
    return { rate: rate.toFixed(1), status, color, rowColor };
  };

  const exportToExcel = () => {
    let csv = '\ufeffÖğrenci No,Ad,Soyad,Bölüm,Takım';
    
    for (let i = 1; i <= 14; i++) {
      csv += `,Hafta ${i}`;
    }
    csv += ',Toplam Katılım,Yüzde,Durum\n';
    
    students.forEach(student => {
      csv += `${student.no},${student.ad},${student.soyad},${student.bolum},${student.team}`;
      
      for (let i = 1; i <= 14; i++) {
        csv += `,${student.yoklamalar.includes(i) ? 'VAR' : 'YOK'}`;
      }
      
      const attendance = calculateAttendance(student);
      csv += `,${student.yoklamalar.length},%${attendance.rate},${attendance.status}\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `yoklama_${dersInfo.dersKodu}_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    setMessage('✅ Excel dosyası indirildi!');
  };

  // LOGIN VIEW
  if (view === 'login') {
    if (registerView) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
            <div className="text-center mb-8">
              <div className="bg-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserPlus className="text-white" size={40} />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Yoklama Girişi</h1>
              <p className="text-gray-600">{dersInfo.dersKodu} - {currentWeek}. Hafta</p>
              <p className="text-xs text-gray-500 mt-2">📍 Yaşar Üniversitesi Kampüsü</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Öğrenci Numaranız</label>
                <input
                  type="text"
                  value={registerNo}
                  onChange={(e) => setRegisterNo(e.target.value)}
                  placeholder="Örn: 21070008016"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Adınız</label>
                <input
                  type="text"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value.toUpperCase())}
                  placeholder="Örn: CAN"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent uppercase"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Soyadınız</label>
                <input
                  type="text"
                  value={registerSurname}
                  onChange={(e) => setRegisterSurname(e.target.value.toUpperCase())}
                  placeholder="Örn: GİRGİN"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent uppercase"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">QR Kod (Tahtadan)</label>
                <input
                  type="text"
                  value={registerCode}
                  onChange={(e) => setRegisterCode(e.target.value.toUpperCase())}
                  placeholder="Örn: QRAB3X5Y"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent font-mono text-lg"
                />
              </div>
              <button
                onClick={handleRegister}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2 font-semibold"
              >
                <MapPin size={20} />
                Yoklamaya Katıl
              </button>
              <button
                onClick={() => { setRegisterView(false); setMessage(''); }}
                className="w-full bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition"
              >
                Geri Dön
              </button>
            </div>

            {message && (
              <div className={`mt-4 p-3 rounded-lg text-sm whitespace-pre-line ${message.includes('❌') || message.includes('⚠️') ? 'bg-red-50 text-red-800' : 'bg-green-50 text-green-800'}`}>
                {message}
              </div>
            )}

            <div className="mt-4 p-3 bg-blue-50 rounded-lg text-xs text-blue-800">
              <p className="font-semibold mb-1">📍 Konum Kontrolü:</p>
              <p>Yaşar Üniversitesi kampüsünden {classLocation.radius}m içinde olmalısınız.</p>
              <p className="mt-1 text-xs">Kazımdirik Mah. Üniversite Cad. No:37-39 Bornova/İzmir</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="bg-indigo-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Camera className="text-white" size={40} />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Akıllı Yoklama Sistemi</h1>
            <p className="text-gray-600">{dersInfo.dersKodu} - {dersInfo.dersAdi}</p>
            <p className="text-sm text-gray-500 mt-2">📍 Yaşar Üniversitesi</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email / Öğrenci No</label>
              <input
                type="text"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="ornek@ogrenci.edu.tr"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Şifre</label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={handleLogin}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2 font-semibold"
            >
              <Users size={20} />
              Giriş Yap (Email ile)
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">veya</span>
              </div>
            </div>

            <button
              onClick={() => { setRegisterView(true); setMessage(''); }}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2 font-semibold"
            >
              <UserPlus size={20} />
              Yoklama Yap (No/Ad/Soyad)
            </button>
          </div>

          {message && (
            <div className={`mt-4 p-3 rounded-lg text-sm ${message.includes('❌') ? 'bg-red-50 text-red-800' : 'bg-green-50 text-green-800'}`}>
              {message}
            </div>
          )}

          <div className="mt-6 text-center text-xs text-gray-500 space-y-1">
            <p>🔒 Kampüsten {classLocation.radius}m içinde olmalısınız</p>
            <p className="text-gray-400">Hoca: hoca@universite.edu.tr</p>
            <p className="text-gray-400">Toplam {students.length} öğrenci kayıtlı</p>
          </div>
        </div>
      </div>
    );
  }

  // STUDENT VIEW
  if (view === 'student') {
    const attendance = calculateAttendance(currentUser);
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Yoklama Sistemi</h2>
                <p className="text-gray-600">{currentUser.ad} {currentUser.soyad}</p>
                <p className="text-sm text-gray-500">{currentUser.no}</p>
              </div>
              <button
                onClick={() => { setView('login'); setCurrentUser(null); setMessage(''); setLoginEmail(''); setLoginPassword(''); }}
                className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
              >
                <LogOut size={16} />
                Çıkış
              </button>
            </div>

            <div className="bg-indigo-50 rounded-xl p-6 mb-6">
              <p className="text-center text-gray-700 mb-4">
                <span className="font-bold text-3xl">{currentWeek}. Hafta</span>
              </p>
              <p className="text-center text-sm text-gray-600">Hoca QR kodu oluşturduğunda butona basabilirsiniz</p>
              <p className="text-center text-xs text-gray-500 mt-2">📍 Kampüsten {classLocation.radius}m içinde olmalısınız</p>
            </div>

            <button
              onClick={handleAttendance}
              disabled={!qrToken || new Date() > qrExpiry}
              className={`w-full py-4 rounded-xl transition flex items-center justify-center gap-2 text-lg font-semibold ${
                qrToken && new Date() <= qrExpiry 
                  ? 'bg-green-600 text-white hover:bg-green-700 cursor-pointer' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <MapPin size={24} />
              {qrToken && new Date() <= qrExpiry ? 'Yoklamaya Katıl' : 'QR Kod Bekleyin'}
            </button>

            {message && (
              <div className={`mt-4 p-4 rounded-lg whitespace-pre-line ${message.includes('✅') ? 'bg-green-50 text-green-800' : message.includes('❌') ? 'bg-red-50 text-red-800' : 'bg-yellow-50 text-yellow-800'}`}>
                {message}
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 mb-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Devamsızlık Durumum</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Katılım Oranı</p>
                <p className={`text-3xl font-bold ${attendance.rate >= 70 ? 'text-green-600' : 'text-red-600'}`}>
                  %{attendance.rate}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Durum</p>
                <p className={`text-2xl font-bold ${attendance.rate >= 70 ? 'text-green-600' : 'text-red-600'}`}>
                  {attendance.status}
                </p>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-2">{currentUser.yoklamalar.length} / {dersInfo.toplamHafta} hafta katıldınız</p>
              <div className="flex gap-1">
                {[...Array(14)].map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 h-8 rounded ${
                      currentUser.yoklamalar.includes(i + 1) ? 'bg-green-500' : i + 1 <= currentWeek ? 'bg-red-500' : 'bg-gray-300'
                    }`}
                    title={`Hafta ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // TEACHER VIEW
  if (view === 'teacher') {
    const attendedThisWeek = students.filter(s => s.yoklamalar.includes(currentWeek));
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4">
        <div className="max-w-7xl mx-auto">
          {/* Modal - Yoklama Geçersiz Kılma */}
          {showInvalidateModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="text-red-600" size={32} />
                  <h3 className="text-xl font-bold text-gray-800">Yoklamayı İptal Et</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  <strong>{selectedStudent?.ad} {selectedStudent?.soyad}</strong> öğrencisinin <strong>{currentWeek}. hafta</strong> yoklamasını geçersiz saymak istediğinizden emin misiniz?
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={confirmInvalidate}
                    className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition font-semibold"
                  >
                    Evet, Geçersiz Say
                  </button>
                  <button
                    onClick={() => { setShowInvalidateModal(false); setSelectedStudent(null); }}
                    className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition font-semibold"
                  >
                    İptal
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Öğretim Üyesi Paneli</h2>
                <p className="text-gray-600">{dersInfo.dersKodu} - {dersInfo.dersAdi}</p>
                <p className="text-sm text-gray-500">📍 {classLocation.name}</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={exportToExcel}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2">
                  <Download size={20} />
                  Excel İndir
                </button>
                <button
                  onClick={() => { setView('login'); setCurrentUser(null); setLoginEmail(''); setLoginPassword(''); }}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Çıkış
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 rounded-xl p-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Hafta Seçin:</label>
                <select
                  value={currentWeek}
                  onChange={(e) => setCurrentWeek(Number(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  {[...Array(14)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}. Hafta</option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-2">Bu haftaya {attendedThisWeek.length} öğrenci katıldı</p>
              </div>

              <div className="bg-indigo-50 rounded-xl p-6 flex items-center justify-center">
                <button
                  onClick={generateQRCode}
                  className="bg-indigo-600 text-white px-8 py-4 rounded-xl hover:bg-indigo-700 transition flex items-center gap-2 text-lg font-semibold"
                >
                  <QrCode size={24} />
                  QR Kod Oluştur
                </button>
              </div>
            </div>

            {qrToken && timeLeft > 0 && (
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-8 text-center mb-6">
                <div className="bg-white rounded-xl p-8 inline-block">
                  <div className="text-6xl mb-4">📱</div>
                  <div className="text-2xl font-bold text-gray-800 mb-2">QR KOD</div>
                  <div className="bg-gray-100 p-4 rounded-lg font-mono text-3xl break-all mb-4 font-bold text-indigo-600">
                    {qrToken}
                  </div>
                  <div className="text-2xl font-semibold text-indigo-600">
                    ⏱️ {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                  </div>
                </div>
                <p className="text-white mt-4 text-lg font-semibold">Bu kodu tahtaya yansıtın - Öğrenciler girecek</p>
              </div>
            )}

            {message && (
              <div className="mt-4 p-4 bg-green-50 text-green-800 rounded-lg font-semibold">{message}</div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 overflow-x-auto">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <BarChart size={28} />
                Öğrenci Listesi ({students.length} kişi)
              </h3>
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span>Var</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span>Yok</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-200 rounded"></div>
                  <span>Risk</span>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b-2 border-gray-200 bg-indigo-600 text-white">
                    <th className="text-left py-2 px-2">No</th>
                    <th className="text-left py-2 px-2">Ad Soyad</th>
                    <th className="text-left py-2 px-2">Bölüm</th>
                    <th className="text-center py-2 px-1">T</th>
                    {[...Array(14)].map((_, i) => (
                      <th key={i} className="text-center py-2 px-1">{i + 1}</th>
                    ))}
                    <th className="text-center py-2 px-2">%</th>
                    <th className="text-center py-2 px-2">Durum</th>
                    <th className="text-center py-2 px-2">İşlem</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => {
                    const attendance = calculateAttendance(student);
                    const attendedThisWeekBool = student.yoklamalar.includes(currentWeek);
                    return (
                      <tr key={student.id} className={`border-b border-gray-100 hover:bg-gray-50 ${attendance.rowColor}`}>
                        <td className="py-2 px-2 font-mono text-xs">{student.no}</td>
                        <td className="py-2 px-2 font-semibold">{student.ad} {student.soyad}</td>
                        <td className="py-2 px-2 text-xs">{student.bolum}</td>
                        <td className="py-2 px-1 text-center font-bold">{student.team}</td>
                        {[...Array(14)].map((_, i) => (
                          <td key={i} className="py-2 px-1">
                            <div className={`w-5 h-5 rounded mx-auto ${student.yoklamalar.includes(i + 1) ? 'bg-green-500' : 'bg-red-500'}`}></div>
                          </td>
                        ))}
                        <td className="py-2 px-2 text-center font-bold">{attendance.rate}</td>
                        <td className="py-2 px-2 text-center">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${attendance.color}`}>
                            {attendance.status}
                          </span>
                        </td>
                        <td className="py-2 px-2 text-center">
                          {attendedThisWeekBool ? (
                            <button
                              onClick={() => invalidateAttendance(student)}
                              className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600 transition flex items-center gap-1 mx-auto"
                              title="Bu hafta yoklamasını iptal et"
                            >
                              <X size={12} />
                              İptal
                            </button>
                          ) : (
                            <span className="text-gray-400 text-xs">-</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default YoklamaSistemi;