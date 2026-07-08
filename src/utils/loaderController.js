let showLoader = () => {};
let hideLoader = () => {};

let activeRequests = 0;

export const registerLoader = (show, hide) => {
  showLoader = show;
  hideLoader = hide;
};

export const loader = {
  show() {
    activeRequests++;

    if (activeRequests === 1) {
      showLoader();
    }
  },

  hide() {
    if (activeRequests > 0) {
      activeRequests--;
    }

    if (activeRequests === 0) {
      hideLoader();
    }
  },
};
