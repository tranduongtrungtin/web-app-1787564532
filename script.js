/* ==========================================================================
   HỌC VIỆN ĐẤT ĐEN - CORE JAVASCRIPT & LOCALSTORAGE DATA ENGINE
   ========================================================================== */

// Seed Data Key Names
const STORAGE_KEY_BATCHES = 'datden_batches';
const STORAGE_KEY_INQUIRIES = 'datden_inquiries';

// Default Sample Batches
const initialBatches = [
  {
    id: 'DATDEN-COFFEE-88',
    productName: 'Cà Phê Robusta Sinh Học Lên Men Mật',
    farmerName: 'HTX Nông Nghiệp Bền Vững Cư M\'gar',
    location: 'Huyện Cư M\'gar, Tỉnh Đắk Lắk',
    gpsCoords: '12.8251° N, 108.0645° E',
    harvestDate: '15/11/2024',
    bioMethod: 'Ủ phân hữu cơ vi sinh IMO4 + Enzyne thực vật bản địa',
    soilBioIndex: '9.4/10 (Vi sinh bản địa hoạt tính cao)',
    chemicalResidue: '0.00% (Phân tích theo tiêu chuẩn EU)',
    carbonOffset: '-3.2 tấn CO2e / ha',
    testStatus: 'Đã xác thực 0% dư lượng hóa chất',
    traceable24h: 'Hệ thống khoanh vùng phản ứng nhanh 24h kích hoạt'
  },
  {
    id: 'DATDEN-CACAO-09',
    productName: 'Hạt Cacao Thô Lên Men Chuẩn Xuất Khẩu EU',
    farmerName: 'Nông Hộ Y Krông & Liên Minh Đất Đen',
    location: 'Huyện Ea Kar, Tỉnh Đắk Lắk',
    gpsCoords: '12.7812° N, 108.4510° E',
    harvestDate: '02/12/2024',
    bioMethod: 'Lên men thùng gỗ 6 ngày + Men vi sinh IMO bản địa',
    soilBioIndex: '9.1/10 (Cải tạo đất đỏ bazan nén dẻo)',
    chemicalResidue: '0.00% (Đạt tiêu chuẩn USDA Organic)',
    carbonOffset: '-2.8 tấn CO2e / ha',
    testStatus: 'Đã xác thực 0% dư lượng hóa chất',
    traceable24h: 'Hệ thống khoanh vùng phản ứng nhanh 24h kích hoạt'
  },
  {
    id: 'DATDEN-MACCA-102',
    productName: 'Hạt Macca Sấy Nứt Vỏ Sinh Học',
    farmerName: 'Tổ Hợp Tác Nông Nghiệp Xanh Lâm Hà',
    location: 'Huyện Lâm Hà, Tỉnh Lâm Đồng',
    gpsCoords: '11.8320° N, 108.2041° E',
    harvestDate: '20/10/2024',
    bioMethod: 'Canh tác đa tầng xen canh gừng dại + Phủ đất hữu cơ',
    soilBioIndex: '9.6/10 (Thổ nhưỡng phục hồi tự nhiên)',
    chemicalResidue: '0.00% (Chứng nhận độc lập SGS)',
    carbonOffset: '-4.1 tấn CO2e / ha',
    testStatus: 'Đã xác thực 0% dư lượng hóa chất',
    traceable24h: 'Hệ thống khoanh vùng phản ứng nhanh 24h kích hoạt'
  }
];

// Default Sample Inquiries
const initialInquiries = [
  {
    id: 1710000001,
    fullName: 'Trần Văn Hoàng',
    phone: '0918 234 567',
    email: 'hoang.tran@agriexport.com',
    type: 'Đối tác thu mua nông sản chuẩn Hộ chiếu',
    course: 'Cung Ứng Nông Sản Chuẩn Xuất Khẩu',
    note: 'Cần hợp đồng thu mua 20 tấn Cà phê Robusta chuẩn Net-Zero xuất Đức.',
    date: '10/01/2025',
    status: 'Mới'
  },
  {
    id: 1710000002,
    fullName: 'Lê Thị Mai',
    phone: '0905 888 999',
    email: 'maile@htx-dalat.vn',
    type: 'HTX / Doanh nghiệp cần chuẩn hóa vùng trồng',
    course: 'Tư Vấn & Chuẩn Hóa Vùng Nguyên Liệu',
    note: 'HTX chúng tôi có 45 ha rau củ muốn chuyển đổi mô hình Đất Đen.',
    date: '12/01/2025',
    status: 'Đã tư vấn'
  }
];

// Init Data in LocalStorage if not present
function initLocalStorage() {
  if (!localStorage.getItem(STORAGE_KEY_BATCHES)) {
    localStorage.setItem(STORAGE_KEY_BATCHES, JSON.stringify(initialBatches));
  }
  if (!localStorage.getItem(STORAGE_KEY_INQUIRIES)) {
    localStorage.setItem(STORAGE_KEY_INQUIRIES, JSON.stringify(initialInquiries));
  }
}

function getBatches() {
  initLocalStorage();
  return JSON.parse(localStorage.getItem(STORAGE_KEY_BATCHES)) || [];
}

function saveBatches(batches) {
  localStorage.setItem(STORAGE_KEY_BATCHES, JSON.stringify(batches));
}

function getInquiries() {
  initLocalStorage();
  return JSON.parse(localStorage.getItem(STORAGE_KEY_INQUIRIES)) || [];
}

function saveInquiries(inquiries) {
  localStorage.setItem(STORAGE_KEY_INQUIRIES, JSON.stringify(inquiries));
}

/* ==========================================================================
   CLIENT PAGE FUNCTIONS
   ========================================================================== */

function selectCourse(courseName) {
  const input = document.getElementById('selectedCourseInput');
  if (input) {
    input.value = courseName;
    document.getElementById('lien-he').scrollIntoView({ behavior: 'smooth' });
  }
}

function submitContactForm(event) {
  event.preventDefault();
  const fullName = document.getElementById('fullName').value.trim();
  const phone = document.getElementById('phoneNumber').value.trim();
  const email = document.getElementById('emailAddr').value.trim();
  const type = document.getElementById('registrationType').value;
  const course = document.getElementById('selectedCourseInput').value.trim() || 'Tư vấn tổng quan';
  const note = document.getElementById('messageNote').value.trim();

  if (!fullName || !phone) {
    alert('Vui lòng điền đầy đủ Họ tên và Số điện thoại!');
    return;
  }

  const inquiries = getInquiries();
  const newInquiry = {
    id: Date.now(),
    fullName,
    phone,
    email,
    type,
    course,
    note,
    date: new Date().toLocaleDateString('vi-VN'),
    status: 'Mới'
  };

  inquiries.unshift(newInquiry);
  saveInquiries(inquiries);

  alert('Cảm ơn bạn! Thông tin đăng ký đã được gửi đến Học Viện Đất Đen. Chúng tôi sẽ liên hệ trong thời gian sớm nhất.');
  document.getElementById('contactForm').reset();
}

function quickLookup(code) {
  const input = document.getElementById('lookupCodeInput');
  if (input) input.value = code;
  performPassportLookup(code);
}

function performPassportLookup(codeFromBtn) {
  const input = document.getElementById('lookupCodeInput');
  const code = (codeFromBtn || (input ? input.value : '')).trim().toUpperCase();

  if (!code) {
    alert('Vui lòng nhập mã lô hàng để tra cứu!');
    return;
  }

  const batches = getBatches();
  const match = batches.find(b => b.id.toUpperCase() === code);

  if (!match) {
    alert(`Không tìm thấy dữ liệu Hộ Chiếu Năng Lực cho mã lô: ${code}. Vui lòng thử lại với các mã mẫu!`);
    return;
  }

  showPassportModal(match);
}

function showPassportModal(batch) {
  const container = document.getElementById('modalPassportContent');
  if (!container) return;

  container.innerHTML = `
    <div class="border-b border-white/20 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <div class="flex items-center gap-2">
          <span class="px-3 py-1 bg-gold text-forest text-xs font-bold rounded uppercase tracking-wider">Hộ Chiếu Năng Lực</span>
          <span class="font-mono text-gold font-bold text-sm">#${batch.id}</span>
        </div>
        <h2 class="text-2xl font-serif-title font-bold text-white mt-2">${batch.productName}</h2>
      </div>
      <div class="text-right text-xs text-gray-300">
        <p><i class="fa-solid fa-circle-check text-green-400 mr-1"></i> Trạng Thái: <strong class="text-green-300">Minh Bạch 100%</strong></p>
        <p class="mt-1 text-[11px] text-gray-400">Cấp bởi Học Viện Đất Đen</p>
      </div>
    </div>

    <!-- 3 LAYERS OF DATA IN MODAL -->
    <div class="space-y-6">
      
      <!-- Layer 1 -->
      <div class="bg-black/30 p-5 rounded-2xl border border-white/10 space-y-3">
        <h4 class="text-gold font-bold text-sm uppercase tracking-wider flex items-center gap-2">
          <i class="fa-solid fa-map-location-dot"></i> Lớp 1: Dữ Liệu Nguồn Gốc & Thổ Nhưỡng
        </h4>
        <div class="grid sm:grid-cols-2 gap-3 text-xs text-gray-200">
          <div><span class="text-gray-400 block">Nông hộ / HTX Phụ trách:</span> <strong class="text-white">${batch.farmerName}</strong></div>
          <div><span class="text-gray-400 block">Tọa độ GPS Vùng Canh tác:</span> <strong class="font-mono text-gold">${batch.gpsCoords || '12.8251° N, 108.0645° E'}</strong></div>
          <div><span class="text-gray-400 block">Địa điểm:</span> <strong class="text-white">${batch.location}</strong></div>
          <div><span class="text-gray-400 block">Thời gian Thu hoạch:</span> <strong class="text-white">${batch.harvestDate || 'Gần nhất'}</strong></div>
        </div>
      </div>

      <!-- Layer 2 -->
      <div class="bg-black/30 p-5 rounded-2xl border border-white/10 space-y-3">
        <h4 class="text-amber-400 font-bold text-sm uppercase tracking-wider flex items-center gap-2">
          <i class="fa-solid fa-flask-vial"></i> Lớp 2: Quá Trình Canh Tác Sinh Học Real-Time
        </h4>
        <div class="space-y-2 text-xs text-gray-200">
          <div><span class="text-gray-400">Công thức vi sinh bản địa:</span> <p class="font-medium text-white mt-0.5">${batch.bioMethod}</p></div>
          <div class="flex justify-between items-center bg-white/5 p-2 rounded border border-white/5">
            <span class="text-gray-300">Chỉ số Hoạt tính Sinh học Đất:</span>
            <span class="font-bold text-green-400">${batch.soilBioIndex}</span>
          </div>
        </div>
      </div>

      <!-- Layer 3 -->
      <div class="bg-black/30 p-5 rounded-2xl border border-white/10 space-y-3">
        <h4 class="text-green-400 font-bold text-sm uppercase tracking-wider flex items-center gap-2">
          <i class="fa-solid fa-leaf"></i> Lớp 3: Kết Quả Kiểm Định & Chỉ Số Carbon
        </h4>
        <div class="grid sm:grid-cols-2 gap-3 text-xs text-gray-200">
          <div class="bg-green-950/40 p-3 rounded-xl border border-green-500/20">
            <span class="text-gray-400 block">Giảm Phát Thải Carbon (CO2e):</span>
            <span class="text-lg font-bold text-gold font-serif-title">${batch.carbonOffset}</span>
          </div>
          <div class="bg-green-950/40 p-3 rounded-xl border border-green-500/20">
            <span class="text-gray-400 block">Dư lượng Hóa chất / Thuốc BVTV:</span>
            <span class="text-lg font-bold text-green-300 font-serif-title">${batch.chemicalResidue || '0.00%'}</span>
          </div>
        </div>
        <p class="text-[11px] text-gray-400 italic pt-2 border-t border-white/5">
          <i class="fa-solid fa-shield-check text-gold mr-1"></i> Sẵn sàng truy vết sự cố trong 24 giờ & xác minh qua QR Code mã số công khai.
        </p>
      </div>
    </div>

    <div class="pt-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
      <div class="flex items-center gap-2 text-gold">
        <i class="fa-solid fa-award text-xl"></i>
        <span>Học Viện Đất Đen Certificated • Verified Origin</span>
      </div>
      <button onclick="closePassportModal()" class="px-6 py-2.5 bg-gold text-forest font-bold rounded-xl hover:bg-amber-300 transition-colors uppercase tracking-wider w-full sm:w-auto">
        Đóng Tra Cứu
      </button>
    </div>
  `;

  document.getElementById('passportModal').classList.remove('hidden');
}

function closePassportModal() {
  const modal = document.getElementById('passportModal');
  if (modal) modal.classList.add('hidden');
}

/* Update stats counter on landing page dynamically */
function updateClientStats() {
  const batches = getBatches();
  const passportCountElem = document.getElementById('stat-passports');
  if (passportCountElem) {
    passportCountElem.innerText = `${batches.length + 450}+`;
  }
}

/* ==========================================================================
   ADMIN PAGE FUNCTIONS
   ========================================================================== */

function switchAdminTab(tabName) {
  ['dashboard', 'batches', 'inquiries'].forEach(t => {
    const contentElem = document.getElementById(`tabContent-${t}`);
    const btnElem = document.getElementById(`tabBtn-${t}`);
    if (contentElem) contentElem.classList.add('hidden');
    if (btnElem) {
      btnElem.classList.remove('bg-forest', 'text-white', 'shadow');
      btnElem.classList.add('text-gray-700', 'hover:bg-gray-100');
    }
  });

  const activeContent = document.getElementById(`tabContent-${tabName}`);
  const activeBtn = document.getElementById(`tabBtn-${tabName}`);
  if (activeContent) activeContent.classList.remove('hidden');
  if (activeBtn) {
    activeBtn.classList.remove('text-gray-700', 'hover:bg-gray-100');
    activeBtn.classList.add('bg-forest', 'text-white', 'shadow');
  }
}

function renderAdminDashboard() {
  const batches = getBatches();
  const inquiries = getInquiries();

  const statPassports = document.getElementById('admStatPassports');
  const statInquiries = document.getElementById('admStatInquiries');
  const inquiryBadgeCount = document.getElementById('inquiryBadgeCount');

  if (statPassports) statPassports.innerText = batches.length;
  if (statInquiries) statInquiries.innerText = inquiries.length;
  if (inquiryBadgeCount) inquiryBadgeCount.innerText = inquiries.length;

  renderBatchTable();
  renderInquiryTable();
}

function renderBatchTable() {
  const tbody = document.getElementById('adminBatchTableBody');
  if (!tbody) return;

  const batches = getBatches();
  if (batches.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="p-4 text-center text-gray-400">Chưa có lô hàng nào. Thêm mới lô hàng ngay!</td></tr>`;
    return;
  }

  tbody.innerHTML = batches.map(b => `
    <tr class="hover:bg-gray-50 transition-colors">
      <td class="p-3 font-mono font-bold text-forest">${b.id}</td>
      <td class="p-3 font-semibold">${b.productName}</td>
      <td class="p-3 text-gray-600">${b.farmerName}</td>
      <td class="p-3 text-gray-600">${b.location}</td>
      <td class="p-3 text-green-700 font-bold">${b.carbonOffset || '-3.0 tấn CO2e'}</td>
      <td class="p-3 text-center space-x-2">
        <button onclick="quickLookup('${b.id}')" class="px-2.5 py-1 bg-amber-100 text-amber-800 rounded font-bold hover:bg-gold hover:text-forest transition-colors text-[11px]">
          <i class="fa-solid fa-eye mr-1"></i> Xem
        </button>
        <button onclick="deleteBatch('${b.id}')" class="px-2.5 py-1 bg-red-100 text-red-700 rounded font-bold hover:bg-red-600 hover:text-white transition-colors text-[11px]">
          <i class="fa-solid fa-trash mr-1"></i> Xóa
        </button>
      </td>
    </tr>
  `).join('');
}

function renderInquiryTable() {
  const tbody = document.getElementById('adminInquiryTableBody');
  if (!tbody) return;

  const inquiries = getInquiries();
  if (inquiries.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="p-4 text-center text-gray-400">Chưa có yêu cầu liên hệ nào từ Client.</td></tr>`;
    return;
  }

  tbody.innerHTML = inquiries.map(i => `
    <tr class="hover:bg-gray-50 transition-colors">
      <td class="p-3 text-gray-400 text-[11px]">${i.date || 'Gần đây'}</td>
      <td class="p-3 font-bold text-forest">${i.fullName}</td>
      <td class="p-3 text-gray-600">
        <div><i class="fa-solid fa-phone text-gray-400 mr-1"></i>${i.phone}</div>
        ${i.email ? `<div class="text-[11px] text-gray-400">${i.email}</div>` : ''}
      </td>
      <td class="p-3">
        <span class="font-semibold text-basalt">${i.type}</span>
        ${i.course ? `<div class="text-[11px] text-gray-500 italic">Khóa: ${i.course}</div>` : ''}
        ${i.note ? `<div class="text-[11px] text-gray-500 mt-0.5">"${i.note}"</div>` : ''}
      </td>
      <td class="p-3">
        <span class="px-2.5 py-1 text-[10px] font-bold rounded-full ${i.status === 'Mới' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}">
          ${i.status || 'Mới'}
        </span>
      </td>
      <td class="p-3 text-center space-x-1">
        <button onclick="toggleInquiryStatus(${i.id})" class="px-2 py-1 bg-blue-50 text-blue-600 rounded font-bold hover:bg-blue-600 hover:text-white transition-colors text-[11px]">
          <i class="fa-solid fa-arrows-rotate"></i> Đổi Trạng Thái
        </button>
        <button onclick="deleteInquiry(${i.id})" class="px-2 py-1 bg-red-50 text-red-600 rounded font-bold hover:bg-red-600 hover:text-white transition-colors text-[11px]">
          <i class="fa-solid fa-trash"></i>
        </button>
      </td>
    </tr>
  `).join('');
}

function openAddBatchModal() {
  const modal = document.getElementById('addBatchModal');
  if (modal) modal.classList.remove('hidden');
}

function closeAddBatchModal() {
  const modal = document.getElementById('addBatchModal');
  if (modal) modal.classList.add('hidden');
}

function saveNewBatch(event) {
  event.preventDefault();
  const code = document.getElementById('batchCode').value.trim().toUpperCase();
  const productName = document.getElementById('productName').value.trim();
  const farmerName = document.getElementById('farmerName').value.trim();
  const location = document.getElementById('location').value.trim();
  const gpsCoords = document.getElementById('gpsCoords').value.trim() || '12.8251° N, 108.0645° E';
  const bioMethod = document.getElementById('bioMethod').value.trim() || 'Ủ phân vi sinh IMO4 bản địa';
  const soilBioIndex = document.getElementById('soilBioIndex').value.trim() || '9.5/10';
  const carbonOffset = document.getElementById('carbonOffset').value.trim() || '-3.5 tấn CO2e / ha';
  const testStatus = document.getElementById('testStatus').value;

  const batches = getBatches();
  if (batches.some(b => b.id.toUpperCase() === code)) {
    alert('Mã lô hàng này đã tồn tại trong hệ thống! Vui lòng nhập mã khác.');
    return;
  }

  const newBatch = {
    id: code,
    productName,
    farmerName,
    location,
    gpsCoords,
    harvestDate: new Date().toLocaleDateString('vi-VN'),
    bioMethod,
    soilBioIndex,
    chemicalResidue: '0.00% (Đạt tiêu chuẩn)',
    carbonOffset,
    testStatus,
    traceable24h: 'Hệ thống khoanh vùng phản ứng nhanh 24h kích hoạt'
  };

  batches.unshift(newBatch);
  saveBatches(batches);

  closeAddBatchModal();
  renderAdminDashboard();
  updateClientStats();
  alert(`Đã cấp thành công Hộ Chiếu Năng Lực cho lô hàng: ${code}`);
}

function deleteBatch(id) {
  if (!confirm(`Bạn có chắc muốn xóa Hộ chiếu lô hàng ${id}?`)) return;
  let batches = getBatches();
  batches = batches.filter(b => b.id !== id);
  saveBatches(batches);
  renderAdminDashboard();
  updateClientStats();
}

function toggleInquiryStatus(id) {
  let inquiries = getInquiries();
  const item = inquiries.find(i => i.id === id);
  if (item) {
    item.status = item.status === 'Mới' ? 'Đã tư vấn' : 'Mới';
    saveInquiries(inquiries);
    renderInquiryTable();
  }
}

function deleteInquiry(id) {
  if (!confirm('Bạn có chắc muốn xóa yêu cầu đăng ký này?')) return;
  let inquiries = getInquiries();
  inquiries = inquiries.filter(i => i.id !== id);
  saveInquiries(inquiries);
  renderAdminDashboard();
}

// DOM Load Initializer
document.addEventListener('DOMContentLoaded', () => {
  initLocalStorage();
  updateClientStats();
  if (document.getElementById('adminBatchTableBody')) {
    renderAdminDashboard();
  }
});