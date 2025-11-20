export default function StudentProfile() {
    return (
      <section className="card bg-light border-0 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fs-4 fw-bold m-0">Validasi Data</h2>
          <div className="d-flex gap-2">
            <span>Status</span>
            <span>:</span>
            <span>Valid</span>
          </div>
        </div>
  
        <div className="row g-3">
          <div className="col-12">
            <div className="d-flex gap-4">
              <div>
                <div className="d-flex align-items-center gap-3">
                  <input type="checkbox" className="form-check-input" />
                  <span>Nama</span>
                  <span>:</span>
                </div>
                <div className="d-flex align-items-center gap-3 mt-2">
                  <input type="checkbox" className="form-check-input" />
                  <span>NIM</span>
                  <span>:</span>
                </div>
              </div>
              <div className="d-flex flex-column gap-2">
                <span>Mendes, Camilla Lovenia Monalisa Claudia</span>
                <span>105011050808</span>
              </div>
            </div>
          </div>
  
          <div className="col-12">
            <div className="d-flex gap-4">
              <div className="d-flex align-items-center gap-3">
                <input type="checkbox" className="form-check-input" />
                <span>Nomor Regis</span>
                <span>:</span>
              </div>
              <span>s08080511</span>
            </div>
          </div>
  
          <div className="col-12">
            <div className="d-flex gap-4">
              <div>
                <div className="d-flex align-items-center gap-3">
                  <input type="checkbox" className="form-check-input" />
                  <span>Tempat, tanggal lahir</span>
                  <span>:</span>
                </div>
                <div className="d-flex align-items-center gap-3 mt-2">
                  <input type="checkbox" className="form-check-input" />
                  <span>Jurusan, Fakultas</span>
                  <span>:</span>
                </div>
              </div>
              <div className="d-flex flex-column gap-2">
                <span>Tempat, 24 September 2003</span>
                <span>Sistem Informasi, Fakultas Ilmu Komputer</span>
              </div>
            </div>
          </div>
  
          <div className="col-12">
            <div className="d-flex gap-4">
              <div className="d-flex align-items-center gap-3">
                <input type="checkbox" className="form-check-input" />
                <span>Alamat</span>
                <span>:</span>
              </div>
              <span>Universitas Klabat</span>
            </div>
          </div>
  
          <div className="col-12">
            <div className="d-flex gap-4">
              <div>
                <div className="d-flex align-items-center gap-3">
                  <input type="checkbox" className="form-check-input" />
                  <span>Nomor Telepon</span>
                  <span>:</span>
                </div>
                <div className="d-flex align-items-center gap-3 mt-2">
                  <input type="checkbox" className="form-check-input" />
                  <span>Beasiswa</span>
                  <span>:</span>
                </div>
              </div>
              <div className="d-flex flex-column gap-2">
                <span>082251867733</span>
                <span>GenBI</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  