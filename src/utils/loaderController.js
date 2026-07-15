let showLoader = () => {};
let hideLoader = () => {};

let activeRequests = 0;

export const registerLoader = (show, hide) => {
  showLoader = typeof show === "function" ? show : () => {};
  hideLoader = typeof hide === "function" ? hide : () => {};
};

export const loader = {
  show() {
    activeRequests += 1;

    if (activeRequests === 1) {
      showLoader();
    }
  },

  hide() {
    if (activeRequests > 0) {
      activeRequests -= 1;
    }

    if (activeRequests === 0) {
      hideLoader();
    }
  },
};
