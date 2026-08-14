<template>
  <div class="app-shell">
    <aside class="sidebar">
      <div class="brand">
        <i class="bi bi-book-half"></i>
        <div>
          <strong>LIBRARY</strong>
          <small>QUẢN LÝ MƯỢN SÁCH</small>
        </div>
      </div>

      <nav class="nav flex-column mt-4">
        <RouterLink to="/dashboard" class="nav-link"><i class="bi bi-grid-1x2"></i> Tổng quan</RouterLink>
        <RouterLink to="/sach" class="nav-link"><i class="bi bi-book"></i> Quản lý sách</RouterLink>
        <RouterLink to="/docgia" class="nav-link"><i class="bi bi-people"></i> Độc giả</RouterLink>
        <RouterLink to="/nhaxuatban" class="nav-link"><i class="bi bi-building"></i> Nhà xuất bản</RouterLink>
        <RouterLink to="/muon-sach" class="nav-link"><i class="bi bi-arrow-left-right"></i> Mượn / trả sách</RouterLink>
        <RouterLink to="/nhanvien" class="nav-link"><i class="bi bi-person-badge"></i> Nhân viên</RouterLink>
      </nav>
    </aside>

    <main class="main-content">
      <header class="topbar">
        <div>
          <h5 class="mb-0">Hệ thống quản lý thư viện</h5>
          <span class="text-muted small">Quản lý sách, độc giả và mượn trả</span>
        </div>
        <div class="admin-badge"><i class="bi bi-person-circle"></i> Quản trị viên</div>
      </header>
      <section class="page-content">
        <RouterView />
      </section>
    </main>
  </div>
</template>

<style scoped>
.app-shell { min-height: 100vh; background: #f5f7fb; }
.sidebar { position: fixed; left: 0; top: 0; bottom: 0; width: 250px; background: #0f2742; color: white; padding: 22px 16px; }
.brand { display:flex; align-items:center; gap:12px; padding: 5px 10px; }
.brand i { font-size: 32px; }
.brand strong { display:block; letter-spacing:1px; }
.brand small { font-size:9px; opacity:.65; }
.nav-link { color:#c7d4e3; border-radius:10px; padding:12px 14px; margin-bottom:5px; }
.nav-link i { width:24px; display:inline-block; }
.nav-link:hover, .nav-link.router-link-active { color:white; background:#1d4f7d; }
.main-content { margin-left:250px; }
.topbar { height:76px; background:white; border-bottom:1px solid #e8edf3; display:flex; align-items:center; justify-content:space-between; padding:0 30px; }
.admin-badge { background:#eef5ff; color:#1d5d9b; padding:9px 14px; border-radius:20px; }
.page-content { padding:28px; }
@media(max-width:800px) {
  .sidebar { width:70px; padding:15px 8px; }
  .brand div, .nav-link:not(.router-link-active) { display:none; }
  .nav-link { text-align:center; }
  .main-content { margin-left:70px; }
  .topbar { padding:0 15px; }
}
</style>
