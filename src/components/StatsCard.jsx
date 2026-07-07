function StatsCard({ title, value, icon }) {
  return (
    <div className="col-sm-6 col-xl-3">
      <div className="border-column card-icon position-relative">
        <div className="row align-items-center mb-1">
          <div className="col position-relative z-1">
            <h2 className="heading-large theme-color">{value}</h2>
          </div>

          <div className="col-auto">
            <div className="carf-info-icon">
              <img src={icon} alt={title} />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <h3 className="fw-medium">{title}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsCard;