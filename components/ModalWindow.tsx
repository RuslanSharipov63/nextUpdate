import styles from "./../stylescomponent/ModalWindow.module.css";

const ModalWindow = () => {
  return (
    <div className={styles.container}>
      <div className="row">
        <div className="col s12 m7 offset-m3 l6 offset-l3 xl4 offset-xl4 ">
          {/*   <h2 className="header">обновить теги и цену</h2> */}
          <div className="card horizontal">
            <div className="card-stacked">
              <div className="card-content">
                <input type="text" />
              </div>
              <div className="card-content">
                <input type="text" />
              </div>
              <div className="card-action">
                <a href="#">This is a link</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;
