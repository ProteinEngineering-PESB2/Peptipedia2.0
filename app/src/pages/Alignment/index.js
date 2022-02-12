import './index.css'

import AlignmentForm from "../../components/Alignment/AlignmentForm";

const Alignment = () => {
  return (
    <div className="wrapper container-fluid p-4">
      <div className="row d-flex justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <AlignmentForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alignment;
