

import '../ResultModal.css'

const ResultModal = ({title, content, callbackFn}) => {

    return (

        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <h2> </h2>
                </div>
                <div className="modal-content">
                    <p></p>
                </div>
                <div className="modal-footer">
                    <button className="close-button">
                        Close Modal
                    </button>
                </div>
            </div>
        </div>

    );


}


export default ResultModal;