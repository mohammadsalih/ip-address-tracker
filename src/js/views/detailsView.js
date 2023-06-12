import view from "./view.js";

class detailsView extends view {
  _parentElement = document.querySelector(".details");

  _generateMarkup() {
    return ` <div class="detail__box">
            <span class="detail__box-title">ip address</span>

            <h2 class="detail__box-info ip">${
              this._data.ipAddress
            }</h2>
          </div>
          <div class="detail__box">
            <span class="detail__box-title">location</span>

            <h2 class="detail__box-info location">${
              this._data.city
            } / ${this._data.country} \n ${
      this._data.postalCode ?? ""
    }</h2>
          </div>
          <div class="detail__box">
            <span class="detail__box-title">Timezone</span>

            <h2 class="detail__box-info timezone">${
              this._data.timezone
            }</h2>
          </div>
          <div class="detail__box">
            <span class="detail__box-title">isp</span>

            <h2 class="detail__box-info isp">${this._data.isp}</h2>
          </div>`;
  }
}

export default new detailsView();
