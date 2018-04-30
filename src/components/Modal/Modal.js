import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { XIcon } from 'react-octicons';
import ActionCreator from '../../actions/ActionCreator';

class Modal extends React.Component {
  constructor() {
    super();

    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    this.props.actions.getWindowHeight();

    window.addEventListener(
      'resize',
      () => {
        this.props.actions.getWindowHeight();
      },
      false,
    );
  }

  toggleModal() {
    if (this.props.currentState.isVisibleModal) {
      return { display: 'block' };
    }

    return { display: 'none' };
  }

  render() {
    return (
      <div className="modal" style={this.toggleModal()}>
        <div
          className="modal__inner"
          style={{ height: this.props.currentState.windowHeight - 120 }}
        >
          <div className="modal-datail">
            <h2 className="modal-datail__title">
              {this.props.currentState.modalContent.siteName}
            </h2>
            <p className="modal-datail__description">
              {this.props.currentState.modalContent.description}
            </p>
            <dl className="modal-datail__list">
              <dt>サイト名</dt>
              <dd>{this.props.currentState.modalContent.siteName}</dd>
              <dt>担当</dt>
              <dd>{this.props.currentState.modalContent.charge}</dd>
              <dt>期間</dt>
              <dd>{this.props.currentState.modalContent.experience}</dd>
              <dt>その他</dt>
              <dd>{this.props.currentState.modalContent.other}</dd>
            </dl>

            <ul className="modal-datail__thumbnail-list">
              {this.props.currentState.modalContent.image.map(image => (
                <li key={image.key}>
                  <div
                    onClick={e => {
                      console.log(e.target);
                      this.props.actions.changeModalImage({
                        src: e.target.src,
                        alt: e.target.alt,
                      });
                    }}
                    role="button"
                    tabIndex="0"
                    className="modal-datail-thumbnail"
                  >
                    <img src={image.src} alt={image.alt} />
                  </div>
                </li>
              ))}
            </ul>

            {(() => {
              if (!this.props.currentState.modalContent.url) {
                return false;
              }

              return (
                <p className="modal-datail__link-btn">
                  <a
                    href={this.props.currentState.modalContent.url}
                    target="_blank"
                  >
                    Visit This Site
                  </a>
                </p>
              );
            })()}
          </div>

          <div className="modal-image">
            <div className="modal-image__inner">
              <img
                src={this.props.currentState.modalImage.src}
                alt={this.props.currentState.modalImage.alt}
              />
            </div>
          </div>
        </div>

        <div className="modal__close-btn">
          <XIcon className="modal-x-icon" />
          <div
            onClick={() => {
              this.props.actions.showModal({ image: [] });
              this.props.actions.changeModalImage({
                src: '',
                alt: '',
              });
              this.toggleModal();
            }}
            role="button"
            tabIndex="0"
          >
            close
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  actions: PropTypes.shape({
    showModal: PropTypes.func.isRequired,
    getWindowHeight: PropTypes.func.isRequired,
    changeModalImage: PropTypes.func.isRequired,
  }),
  currentState: PropTypes.shape({
    modalContent: PropTypes.object.isRequired,
    isVisibleModal: PropTypes.bool.isRequired,
    windowHeight: PropTypes.number.isRequired,
    modalImage: PropTypes.object.isRequired,
  }),
};

Modal.defaultProps = {
  actions: {},
  currentState: {},
};

const mapStateToProps = state => ({ currentState: state.Index });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreator, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
