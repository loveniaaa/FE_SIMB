function StudentInfo({ student }) {
  const fullName = `${student.master_user?.last_name || "-"}, ${student.master_user?.first_name || "-"}`;

  return (
    <section className="container-fluid mt-4">
      {/* NIM dan username */}
      <p className="text-secondary text-center fw-medium mb-4">
        {student.nim || "-"} / {student.no_registration || "-"}
      </p>

      <div className="row ">
        {/* Kiri */}
        <div className="col-lg-8">
          <div className="text-center text-lg-start">
            <h2 className="h4 fw-bold mb-3">{fullName}</h2>
            <div className="mb-3">
              <h6 className="text-muted mb-1">Jurusan</h6>
              <p className="fw-semibold fs-6 mb-0">{student.major?.major_name || "-"}</p>
            </div>
            <div className="mb-3">
              <h6 className="text-muted mb-1">Fakultas</h6>
              <p className="fw-semibold fs-6 mb-0">{student.major?.faculty_name || "-"}</p>
            </div>
          </div>
        </div>

        {/* Kanan */}
        <div className="col-lg-4 d-flex flex-column align-items-center align-items-lg-start">
          <div>
            <h6 className="text-muted mb-1">Beasiswa yang Diikuti</h6>
            <p className="fw-bold text-primary fs-5 mb-0">{student.scholarship_type || "-"}</p>
          </div>
          <div className="mt-2">
            <h6 className="text-muted mb-1">Tanggal Pendaftaran</h6>
            <p className="fw-bold text-success fs-6 mb-0">{formatDate(student.created_at)}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Format tanggal ke format yang lebih readable
function formatDate(dateString) {
  if (!dateString) return "-";
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("id-ID", options);
}

export default StudentInfo;