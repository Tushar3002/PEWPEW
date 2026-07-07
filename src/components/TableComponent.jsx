function TableCard({ title, children }) {
  return (
    <div className="col-xl-6 mt-3 mt-xxl-4">
      <div className="row">
        <div className="col">
          <h3 className="fw-bold theme-color">{title}</h3>
        </div>

        <div className="col-auto">
          <a href="#" className="basic-links">
            View All
          </a>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-12">
          <div className="table-responsive">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableCard;