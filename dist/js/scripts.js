const modules_flsModules = {};

let bodyLockStatus = true;
let bodyUnlock = (delay = 500) => {
  if (bodyLockStatus) {
    const lockPaddingElements = document.querySelectorAll("[data-lp]");
    setTimeout((() => {
      lockPaddingElements.forEach((lockPaddingElement => {
        lockPaddingElement.style.paddingRight = "";
      }));
      document.body.style.paddingRight = "";
      document.documentElement.classList.remove("lock");
    }), delay);
    bodyLockStatus = false;
    setTimeout((function () {
      bodyLockStatus = true;
    }), delay);
  }
};
let bodyLock = (delay = 500) => {
  if (bodyLockStatus) {
    const lockPaddingElements = document.querySelectorAll("[data-lp]");
    const lockPaddingValue = window.innerWidth - document.body.offsetWidth + "px";
    lockPaddingElements.forEach((lockPaddingElement => {
      lockPaddingElement.style.paddingRight = lockPaddingValue;
    }));
    document.body.style.paddingRight = lockPaddingValue;
    document.documentElement.classList.add("lock");
    bodyLockStatus = false;
    setTimeout((function () {
      bodyLockStatus = true;
    }), delay);
  }
};
function functions_FLS(message) {
  setTimeout((() => {
    if (window.FLS) console.log(message);
  }), 0);
}

let _slideUp = (target, duration = 500, showmore = 0) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = `${target.offsetHeight}px`;
    target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout((() => {
      target.hidden = !showmore ? true : false;
      !showmore ? target.style.removeProperty("height") : null;
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-top");
      target.style.removeProperty("margin-bottom");
      !showmore ? target.style.removeProperty("overflow") : null;
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
      document.dispatchEvent(new CustomEvent("slideUpDone", {
        detail: {
          target
        }
      }));
    }), duration);
  }
};
let _slideDown = (target, duration = 500, showmore = 0) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    target.hidden = target.hidden ? false : null;
    showmore ? target.style.removeProperty("height") : null;
    let height = target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = height + "px";
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    window.setTimeout((() => {
      target.style.removeProperty("height");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
      document.dispatchEvent(new CustomEvent("slideDownDone", {
        detail: {
          target
        }
      }));
    }), duration);
  }
};
let _slideToggle = (target, duration = 500) => {
  if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
};

function getHash() {
  if (location.hash) { return location.hash.replace('#', ''); }
}

function dataMediaQueries(array, dataSetValue) {
  const media = Array.from(array).filter(function (item) {
    return item.dataset[dataSetValue];
  });

  if (media.length) {
    const breakpointsArray = media.map(item => {
      const params = item.dataset[dataSetValue];
      const paramsArray = params.split(",");
      return {
        value: paramsArray[0],
        type: paramsArray[1] ? paramsArray[1].trim() : "max",
        item: item
      };
    });

    const mdQueries = uniqArray(
      breakpointsArray.map(item => `(${item.type}-width: ${item.value}px),${item.value},${item.type}`)
    );

    const mdQueriesArray = mdQueries.map(breakpoint => {
      const [query, value, type] = breakpoint.split(",");
      const matchMedia = window.matchMedia(query);
      const itemsArray = breakpointsArray.filter(item => item.value === value && item.type === type);
      return { itemsArray, matchMedia };
    });

    return mdQueriesArray;
  }
}

function uniqArray(array) {
  return array.filter(function (item, index, self) {
    return self.indexOf(item) === index;
  });
}

//========================================================================================================================================================

const iconMenu = document.querySelector('.header__burger');
const headerBody = document.querySelector('.header-menu');

if (iconMenu) {
  iconMenu.addEventListener("click", function (e) {
    e.stopPropagation();
    document.documentElement.classList.toggle("menu-open");
  });
}

document.addEventListener("click", function (e) {
  const isClickInsideMenu = headerBody && headerBody.contains(e.target);
  const isClickOnBurger = iconMenu && iconMenu.contains(e.target);

  if (!isClickInsideMenu && !isClickOnBurger) {
    document.documentElement.classList.remove("menu-open");
  }
});

//========================================================================================================================================================

//Форма
function formFieldsInit(options = { viewPass: true, autoHeight: false }) {
  document.body.addEventListener("focusin", function (e) {
    const targetElement = e.target;
    if ((targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA')) {
      if (!targetElement.hasAttribute('data-no-focus-classes')) {
        targetElement.classList.add('_form-focus');
        targetElement.parentElement.classList.add('_form-focus');
      }
      formValidate.removeError(targetElement);
      targetElement.hasAttribute('data-validate') ? formValidate.removeError(targetElement) : null;
    }
  });
  document.body.addEventListener("focusout", function (e) {
    const targetElement = e.target;
    if ((targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA')) {
      if (!targetElement.hasAttribute('data-no-focus-classes')) {
        targetElement.classList.remove('_form-focus');
        targetElement.parentElement.classList.remove('_form-focus');
      }
      targetElement.hasAttribute('data-validate') ? formValidate.validateInput(targetElement) : null;
    }
  });
  if (options.viewPass) {
    document.addEventListener("click", function (e) {
      const targetElement = e.target;
      if (targetElement.closest('.form__viewpass')) {
        const viewpassBlock = targetElement.closest('.form__viewpass');
        const input = viewpassBlock.closest('.form__input').querySelector('input');

        if (input) {
          const isActive = viewpassBlock.classList.contains('_viewpass-active');
          input.setAttribute("type", isActive ? "password" : "text");
          viewpassBlock.classList.toggle('_viewpass-active');
        } else {
          console.error('Input не найден!');
        }
      }
    });
  }
  if (options.autoHeight) {
    const textareas = document.querySelectorAll('textarea[data-autoheight]');
    if (textareas.length) {
      textareas.forEach(textarea => {
        const startHeight = textarea.hasAttribute('data-autoheight-min') ?
          Number(textarea.dataset.autoheightMin) : Number(textarea.offsetHeight);
        const maxHeight = textarea.hasAttribute('data-autoheight-max') ?
          Number(textarea.dataset.autoheightMax) : Infinity;
        setHeight(textarea, Math.min(startHeight, maxHeight))
        textarea.addEventListener('input', () => {
          if (textarea.scrollHeight > startHeight) {
            textarea.style.height = `auto`;
            setHeight(textarea, Math.min(Math.max(textarea.scrollHeight, startHeight), maxHeight));
          }
        });
      });
      function setHeight(textarea, height) {
        textarea.style.height = `${height}px`;
      }
    }
  }
}
formFieldsInit({
  viewPass: true,
  autoHeight: false
});

let formValidate = {
  getErrors(form) {
    let error = 0;
    let formRequiredItems = form.querySelectorAll('*[data-required]');
    if (formRequiredItems.length) {
      formRequiredItems.forEach(formRequiredItem => {
        if ((formRequiredItem.offsetParent !== null || formRequiredItem.tagName === "SELECT") && !formRequiredItem.disabled) {
          error += this.validateInput(formRequiredItem);
        }
      });
    }
    return error;
  },
  validateInput(formRequiredItem) {
    let error = 0;

    if (formRequiredItem.dataset.required === "email") {
      formRequiredItem.value = formRequiredItem.value.replace(" ", "");
      if (this.emailTest(formRequiredItem)) {
        this.addError(formRequiredItem);
        this.removeSuccess(formRequiredItem);
        error++;
      } else {
        this.removeError(formRequiredItem);
        this.addSuccess(formRequiredItem);
      }
    } else if (formRequiredItem.type === "checkbox" && !formRequiredItem.checked) {
      this.addError(formRequiredItem);
      this.removeSuccess(formRequiredItem);
      error++;
    } else if (formRequiredItem.dataset.validate === "password-confirm") {
      const passwordInput = document.getElementById('password');
      if (!passwordInput) return error;

      if (formRequiredItem.value !== passwordInput.value) {
        this.addError(formRequiredItem);
        this.removeSuccess(formRequiredItem);
        error++;
      } else {
        this.removeError(formRequiredItem);
        this.addSuccess(formRequiredItem);
      }
    } else {
      if (!formRequiredItem.value.trim()) {
        this.addError(formRequiredItem);
        this.removeSuccess(formRequiredItem);
        error++;
      } else {
        this.removeError(formRequiredItem);
        this.addSuccess(formRequiredItem);
      }
    }

    return error;
  },
  addError(formRequiredItem) {
    formRequiredItem.classList.add('_form-error');
    formRequiredItem.parentElement.classList.add('_form-error');
    let inputError = formRequiredItem.parentElement.querySelector('.form__error');
    if (inputError) formRequiredItem.parentElement.removeChild(inputError);
    if (formRequiredItem.dataset.error) {
      formRequiredItem.parentElement.insertAdjacentHTML('beforeend', `<div class="form__error">${formRequiredItem.dataset.error}</div>`);
    }
  },
  removeError(formRequiredItem) {
    formRequiredItem.classList.remove('_form-error');
    formRequiredItem.parentElement.classList.remove('_form-error');
    if (formRequiredItem.parentElement.querySelector('.form__error')) {
      formRequiredItem.parentElement.removeChild(formRequiredItem.parentElement.querySelector('.form__error'));
    }
  },
  addSuccess(formRequiredItem) {
    formRequiredItem.classList.add('_form-success');
    formRequiredItem.parentElement.classList.add('_form-success');
  },
  removeSuccess(formRequiredItem) {
    formRequiredItem.classList.remove('_form-success');
    formRequiredItem.parentElement.classList.remove('_form-success');
  },
  formClean(form) {
    form.reset();
    setTimeout(() => {
      let inputs = form.querySelectorAll('input,textarea');
      for (let index = 0; index < inputs.length; index++) {
        const el = inputs[index];
        el.parentElement.classList.remove('_form-focus');
        el.classList.remove('_form-focus');

        el.classList.remove('_form-success');
        el.parentElement.classList.remove('_form-success');

        el.parentElement.classList.remove('filled');

        formValidate.removeError(el);

        if (el.classList.contains('telephone') && el.clearFilled) {
          el.clearFilled();
        }
      }

      let checkboxes = form.querySelectorAll('.checkbox__input');
      if (checkboxes.length > 0) {
        for (let index = 0; index < checkboxes.length; index++) {
          const checkbox = checkboxes[index];
          checkbox.checked = false;
          checkbox.classList.remove('_form-success');
          checkbox.closest('.checkbox')?.classList.remove('_form-success');
        }
      }

      if (modules_flsModules.select) {
        let selects = form.querySelectorAll('div.select');
        if (selects.length) {
          for (let index = 0; index < selects.length; index++) {
            const select = selects[index].querySelector('select');
            modules_flsModules.select.selectBuild(select);
          }
        }
      }
    }, 0);
  },
  emailTest(formRequiredItem) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(formRequiredItem.value);
  }
};

function formSubmit() {
  const forms = document.forms;
  if (forms.length) {
    for (const form of forms) {
      form.addEventListener('submit', function (e) {
        const form = e.target;
        formSubmitAction(form, e);
      });
      form.addEventListener('reset', function (e) {
        const form = e.target;
        formValidate.formClean(form);
      });
    }
  }

  async function formSubmitAction(form, e) {
    let hasError = false;
    const selectContents = form.querySelectorAll('.select__content');

    selectContents.forEach(content => {
      const selectItem = content.closest('.select');
      if (!selectItem) return;

      const originalSelect = selectItem.querySelector('select');
      if (!originalSelect) return;

      const value = content.value.trim();
      const formInput = selectItem.closest('.form__input');

      if (!value) {
        hasError = true;
        content.classList.add('_form-error');
        if (formInput) {
          formInput.classList.add('_form-error');
        }
      } else {
        content.classList.remove('_form-error');
        if (formInput) {
          formInput.classList.remove('_form-error');
        }
      }
    });

    if (hasError) {
      e.preventDefault();
      const firstError = form.querySelector('._form-error');
      if (firstError) {
        firstError.focus();
      }
      return;
    }

    const error = !form.hasAttribute('data-no-validate') ? formValidate.getErrors(form) : 0;

    if (error === 0) {
      const ajax = form.hasAttribute('data-ajax');
      if (ajax) {
        e.preventDefault();

        const customSelects = form.querySelectorAll('.select');

        customSelects.forEach(selectItem => {
          const originalSelect = selectItem.querySelector('select');
          if (!originalSelect) return;

          let contactMethod = 'Не выбран';
          let contactValue = 'Не указан';

          const selectedOption = originalSelect.options[originalSelect.selectedIndex];

          if (selectedOption && selectedOption.value) {
            if (selectedOption.dataset.custom === 'true') {
              contactMethod = originalSelect.dataset.currentMethod || 'Не выбран';
              contactValue = originalSelect.dataset.userInput || selectedOption.value;
            } else {
              contactMethod = selectedOption.dataset.value || selectedOption.value;
              contactValue = selectedOption.value;
              originalSelect.dataset.currentMethod = contactMethod;
            }
          }

          const oldMethodInput = form.querySelector('input[name="contact_method"]');
          const oldValueInput = form.querySelector('input[name="user_contact_value"]');
          if (oldMethodInput) oldMethodInput.remove();
          if (oldValueInput) oldValueInput.remove();

          const methodInput = document.createElement('input');
          methodInput.type = 'hidden';
          methodInput.name = 'contact_method';
          methodInput.value = contactMethod;
          form.appendChild(methodInput);

          const valueInput = document.createElement('input');
          valueInput.type = 'hidden';
          valueInput.name = 'user_contact_value';
          valueInput.value = contactValue;
          form.appendChild(valueInput);
        });

        const formAction = form.getAttribute('action') ? form.getAttribute('action').trim() : '#';
        const formMethod = form.getAttribute('method') ? form.getAttribute('method').trim() : 'GET';
        const formData = new FormData(form);

        form.classList.add('_sending');

        try {
          const response = await fetch(formAction, {
            method: formMethod,
            body: formData
          });

          if (response.ok) {
            let responseResult = await response.json();
            form.classList.remove('_sending');

            if (responseResult.success) {
              formSent(form, responseResult);

              setTimeout(() => {
                form.reset();
                const allSelects = form.querySelectorAll('select');
                allSelects.forEach(select => {
                  delete select.dataset.userInput;
                  delete select.dataset.currentMethod;
                  const customOpt = select.querySelector('option[data-custom="true"]');
                  if (customOpt) customOpt.remove();
                  Array.from(select.options).forEach(option => {
                    if (option.dataset.originalValue) {
                      option.value = option.dataset.originalValue;
                      delete option.dataset.originalValue;
                    }
                  });
                  select.selectedIndex = 0;
                });
              }, 500);

            } else {
              alert("Ошибка: " + (responseResult.message || "Неизвестная ошибка"));
            }
          } else {
            alert("Ошибка сервера");
            form.classList.remove('_sending');
          }
        } catch (error) {
          alert("Ошибка отправки формы");
          form.classList.remove('_sending');
        }
      } else if (form.hasAttribute('data-dev')) {
        e.preventDefault();
        formSent(form);
      }
    } else {
      e.preventDefault();
      if (form.querySelector('._form-error') && form.hasAttribute('data-goto-error')) {
        const formGoToErrorClass = form.dataset.gotoError ? form.dataset.gotoError : '._form-error';
        gotoBlock(formGoToErrorClass, true, 1000);
      }
    }
  }

  function formSent(form, responseResult = ``) {
    document.dispatchEvent(new CustomEvent("formSent", {
      detail: {
        form: form
      }
    }));

    const telephoneInputs = form.querySelectorAll('.telephone');
    telephoneInputs.forEach(input => {
      input.value = '';
      const parent = input.closest('.form__input');
      if (parent) {
        parent.classList.remove('filled');
      }
    });

    const customSelects = form.querySelectorAll('.select');
    customSelects.forEach(selectItem => {
      const originalSelect = selectItem.querySelector('select');
      if (originalSelect) {
        const customOption = originalSelect.querySelector('option[data-custom="true"]');
        if (customOption) {
          customOption.remove();
        }

        Array.from(originalSelect.options).forEach(option => {
          if (option.dataset.originalValue) {
            option.value = option.dataset.originalValue;
            delete option.dataset.originalValue;
          }
        });

        originalSelect.selectedIndex = 0;

        delete originalSelect.dataset.userInput;
        delete originalSelect.dataset.currentMethod;

        const contentInput = selectItem.querySelector('.select__content');
        if (contentInput) {
          contentInput.value = '';
          const placeholder = originalSelect.dataset.placeholder || '';
          contentInput.placeholder = placeholder;
        }

        selectItem.classList.remove('_select-active');

        const optionButtons = selectItem.querySelectorAll('.select__option');
        optionButtons.forEach(btn => {
          btn.hidden = false;
        });

        if (!originalSelect.hasAttribute('data-show-selected')) {
          const firstOption = selectItem.querySelector('.select__option[data-value]');
          if (firstOption && originalSelect.selectedIndex === 0) {
            firstOption.hidden = true;
          }
        }

        if (typeof SelectConstructor !== 'undefined') {
          const selectInstance = new SelectConstructor({ init: false });
          selectInstance.setSelectTitleValue(selectItem, originalSelect);
        }
      }
    });

    const hiddenInputs = form.querySelectorAll('input[type="hidden"]');
    hiddenInputs.forEach(input => {
      if (input.name === 'button_subject' ||
        input.name === 'contact_method' ||
        input.name === 'user_contact_value') {
        input.value = '';
      }
    });

    if (typeof formValidate !== 'undefined' && formValidate.formClean) {
      formValidate.formClean(form);
    }

    const popupSelector = form.dataset.popupMessage;
    let popup = null;

    if (popupSelector) {
      if (popupSelector.startsWith('#')) {
        popup = document.querySelector(popupSelector);
      } else {
        popup = document.querySelector(`[data-popup="${popupSelector}"]`) ||
          document.querySelector(`.${popupSelector.replace('.', '')}`);
      }
    }

    document.querySelectorAll('.popup_show').forEach(p => {
      p.classList.remove('popup_show');
      p.setAttribute('aria-hidden', 'true');
    });

    if (popup) {
      if (typeof popupOpen === 'function') {
        popupOpen(popupSelector);
      }
      else if (typeof openPopup === 'function') {
        openPopup(popup);
      }
      else {
        popup.classList.add('popup_show');
        popup.setAttribute('aria-hidden', 'false');

        document.documentElement.classList.add('lock', 'popup-show');

        if (typeof bodyLock === 'function') {
          bodyLock();
        } else if (typeof bodyLockToggle === 'function') {
          bodyLockToggle();
        } else {
          document.body.style.overflow = 'hidden';
          document.body.style.paddingRight = '17px';
        }
      }

      document.documentElement.classList.remove('open-quiz');
    } else {
      console.warn('Попап не найден, перенаправление на thanks.html');
      window.location.href = 'thanks.html';
    }
  }
}

formSubmit();

//========================================================================================================================================================

//Попап
class Popup {
  constructor(options) {
    let config = {
      logging: true,
      init: true,
      attributeOpenButton: "data-popup",
      attributeCloseButton: "data-close",
      fixElementSelector: "[data-lp]",
      youtubeAttribute: "data-popup-youtube",
      youtubePlaceAttribute: "data-popup-youtube-place",
      setAutoplayYoutube: true,
      classes: {
        popup: "popup",
        popupContent: "popup__content",
        popupActive: "popup_show",
        bodyActive: "popup-show"
      },
      focusCatch: true,
      closeEsc: true,
      bodyLock: true,
      hashSettings: {
        goHash: true
      },
      on: {
        beforeOpen: function () { },
        afterOpen: function () { },
        beforeClose: function () { },
        afterClose: function () { }
      }
    };
    this.youTubeCode;
    this.isOpen = false;
    this.targetOpen = {
      selector: false,
      element: false
    };
    this.previousOpen = {
      selector: false,
      element: false
    };
    this.lastClosed = {
      selector: false,
      element: false
    };
    this._dataValue = false;
    this.hash = false;
    this._reopen = false;
    this._selectorOpen = false;
    this.lastFocusEl = false;
    this._focusEl = ["a[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "button:not([disabled]):not([aria-hidden])", "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "area[href]", "iframe", "object", "embed", "[contenteditable]", '[tabindex]:not([tabindex^="-"])'];
    this.options = {
      ...config,
      ...options,
      classes: {
        ...config.classes,
        ...options?.classes
      },
      hashSettings: {
        ...config.hashSettings,
        ...options?.hashSettings
      },
      on: {
        ...config.on,
        ...options?.on
      }
    };
    this.bodyLock = false;
    this.previousMenuState = false;
    this.options.init ? this.initPopups() : null;
  }
  initPopups() {
    this.eventsPopup();
  }
  eventsPopup() {
    document.addEventListener("click", function (e) {
      const buttonOpen = e.target.closest(`[${this.options.attributeOpenButton}]`);
      if (buttonOpen) {
        e.preventDefault();
        this._dataValue = buttonOpen.getAttribute(this.options.attributeOpenButton) ? buttonOpen.getAttribute(this.options.attributeOpenButton) : "error";
        this.youTubeCode = buttonOpen.getAttribute(this.options.youtubeAttribute) ? buttonOpen.getAttribute(this.options.youtubeAttribute) : null;
        if ("error" !== this._dataValue) {
          if (!this.isOpen) this.lastFocusEl = buttonOpen;
          this.targetOpen.selector = `${this._dataValue}`;
          this._selectorOpen = true;
          this.open();
          return;
        }
        return;
      }
      const buttonClose = e.target.closest(`[${this.options.attributeCloseButton}]`);
      if (buttonClose || !e.target.closest(`.${this.options.classes.popupContent}`) && this.isOpen) {
        e.preventDefault();
        this.close();
        return;
      }
    }.bind(this));
    document.addEventListener("keydown", function (e) {
      if (this.options.closeEsc && 27 == e.which && "Escape" === e.code && this.isOpen) {
        e.preventDefault();
        this.close();
        return;
      }
      if (this.options.focusCatch && 9 == e.which && this.isOpen) {
        this._focusCatch(e);
        return;
      }
    }.bind(this));
    if (this.options.hashSettings.goHash) {
      window.addEventListener("hashchange", function () {
        if (window.location.hash) this._openToHash(); else this.close(this.targetOpen.selector);
      }.bind(this));
      window.addEventListener("load", function () {
        if (window.location.hash) this._openToHash();
      }.bind(this));
    }
  }
  open(selectorValue) {
    if (bodyLockStatus) {
      this.bodyLock = document.documentElement.classList.contains("lock") && !this.isOpen ? true : false;
      if (selectorValue && "string" === typeof selectorValue && "" !== selectorValue.trim()) {
        this.targetOpen.selector = selectorValue;
        this._selectorOpen = true;
      }
      if (this.isOpen) {
        this._reopen = true;
        this.close();
      }
      if (!this._selectorOpen) this.targetOpen.selector = this.lastClosed.selector;
      if (!this._reopen) this.previousActiveElement = document.activeElement;
      this.targetOpen.element = document.querySelector(this.targetOpen.selector);
      if (this.targetOpen.element) {
        this.previousMenuState = document.documentElement.classList.contains('menu-open');
        if (this.previousMenuState) {
          if (typeof menuClose === 'function') {
            menuClose();
          } else {
            document.documentElement.classList.remove("menu-open");
            if (typeof bodyUnlock === 'function') bodyUnlock();
          }
        }
        if (this.youTubeCode) {
          const codeVideo = this.youTubeCode;
          const urlVideo = `https://www.youtube.com/embed/${codeVideo}?rel=0&showinfo=0&autoplay=1`;
          const iframe = document.createElement("iframe");
          iframe.setAttribute("allowfullscreen", "");
          const autoplay = this.options.setAutoplayYoutube ? "autoplay;" : "";
          iframe.setAttribute("allow", `${autoplay}; encrypted-media`);
          iframe.setAttribute("src", urlVideo);
          if (!this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) {
            this.targetOpen.element.querySelector(".popup__text").setAttribute(`${this.options.youtubePlaceAttribute}`, "");
          }
          this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).appendChild(iframe);
        }
        const videoElement = this.targetOpen.element.querySelector("video");
        if (videoElement) {
          videoElement.muted = true;
          videoElement.currentTime = 0;
          videoElement.play().catch((e => console.error("Autoplay error:", e)));
        }
        if (this.options.hashSettings.location) {
          this._getHash();
          this._setHash();
        }
        this.options.on.beforeOpen(this);
        document.dispatchEvent(new CustomEvent("beforePopupOpen", {
          detail: {
            popup: this
          }
        }));
        this.targetOpen.element.classList.add(this.options.classes.popupActive);
        document.documentElement.classList.add(this.options.classes.bodyActive);
        if (!this._reopen) !this.bodyLock ? bodyLock() : null; else this._reopen = false;
        this.targetOpen.element.setAttribute("aria-hidden", "false");
        this.previousOpen.selector = this.targetOpen.selector;
        this.previousOpen.element = this.targetOpen.element;
        this._selectorOpen = false;
        this.isOpen = true;
        this.options.on.afterOpen(this);
        document.dispatchEvent(new CustomEvent("afterPopupOpen", {
          detail: {
            popup: this
          }
        }));
      }
    }
  }
  close(selectorValue) {
    if (selectorValue && "string" === typeof selectorValue && "" !== selectorValue.trim()) this.previousOpen.selector = selectorValue;
    if (!this.isOpen || !bodyLockStatus) return;
    this.options.on.beforeClose(this);
    document.dispatchEvent(new CustomEvent("beforePopupClose", {
      detail: {
        popup: this
      }
    }));
    if (this.youTubeCode) if (this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).innerHTML = "";
    this.previousOpen.element.classList.remove(this.options.classes.popupActive);
    const videoElement = this.previousOpen.element.querySelector("video");
    if (videoElement) videoElement.pause();
    this.previousOpen.element.setAttribute("aria-hidden", "true");
    if (!this._reopen) {
      document.documentElement.classList.remove(this.options.classes.bodyActive);
      !this.bodyLock ? bodyUnlock() : null;
      this.isOpen = false;
      if (this.previousMenuState) {
        if (typeof menuOpen === 'function') {
          menuOpen();
        } else {
          document.documentElement.classList.add("menu-open");
          if (typeof bodyLock === 'function') bodyLock();
        }
      }
    }
    document.dispatchEvent(new CustomEvent("afterPopupClose", {
      detail: {
        popup: this
      }
    }));
    this.options.on.afterClose(this);
  }
  _getHash() {
    if (this.options.hashSettings.location) this.hash = this.targetOpen.selector.includes("#") ? this.targetOpen.selector : this.targetOpen.selector.replace(".", "#");
  }
  _openToHash() {
    let classInHash = document.querySelector(`.${window.location.hash.replace("#", "")}`) ? `.${window.location.hash.replace("#", "")}` : document.querySelector(`${window.location.hash}`) ? `${window.location.hash}` : null;
    const buttons = document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) ? document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) : document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash.replace(".", "#")}"]`);
    if (buttons && classInHash) this.open(classInHash);
  }
  _setHash() {
    history.pushState("", "", this.hash);
  }
  _removeHash() {
    history.pushState("", "", window.location.href.split("#")[0]);
  }
  _focusCatch(e) {
    const focusable = this.targetOpen.element.querySelectorAll(this._focusEl);
    const focusArray = Array.prototype.slice.call(focusable);
    const focusedIndex = focusArray.indexOf(document.activeElement);
    if (e.shiftKey && 0 === focusedIndex) {
      focusArray[focusArray.length - 1].focus();
      e.preventDefault();
    }
    if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
      focusArray[0].focus();
      e.preventDefault();
    }
  }
}
modules_flsModules.popup = new Popup({});

function menuOpen() {
  bodyLock();
  document.documentElement.classList.add("menu-open");
}
function menuClose() {
  bodyUnlock();
  document.documentElement.classList.remove("menu-open");
}

//========================================================================================================================================================

// Добавление к шапке при скролле
const header = document.querySelector('.header');
if (header) {
  window.addEventListener('scroll', function () {
    if (window.scrollY > 0) {
      header.classList.add('_header-scroll');
      document.documentElement.classList.add('header-scroll');
    } else {
      header.classList.remove('_header-scroll');
      document.documentElement.classList.remove('header-scroll');
    }
  });
}

//========================================================================================================================================================

//Маска
const telephone = document.querySelectorAll('.telephone');
if (telephone) {
  Inputmask({
    "mask": "+7 (999) 999 - 99 - 99",
    "showMaskOnHover": false,
  }).mask(telephone);
}

//========================================================================================================================================================

//Яндекс карта
const map = document.querySelector('#map1');
if (map) {
  ymaps.ready(init);

  function init() {
    var myMap = new ymaps.Map('map1', {
      center: [56.135107, 47.278917],
      zoom: 15,
      controls: ['zoomControl'],
      behaviors: ['drag']
    }, {
      searchControlProvider: 'yandex#search'
    });

    myMap.geoObjects
      .add(new ymaps.Placemark([56.135107, 47.278917], {
        /*
        iconColor: '#0c8ce9',
        iconImageSize: [105, 140],
        iconImageOffset: [-57, -137],*/
      }))

  };
}

//========================================================================================================================================================

if (document.querySelector('.block-descr__slider')) {
  const descrSwiper = new Swiper('.block-descr__slider', {
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 0,
    speed: 400,
    preloadImages: true,
    navigation: {
      prevEl: '.descr-arrow-prev',
      nextEl: '.descr-arrow-next',
    },
    pagination: {
      el: '.descr-pagination',
      clickable: true,
    },
  });
}

//========================================================================================================================================================

Fancybox.bind("[data-fancybox]", {
  // опции
});

//========================================================================================================================================================

//Спойлер
function spollers() {
  const spollersArray = document.querySelectorAll("[data-spollers]");
  if (spollersArray.length > 0) {
    const spollersRegular = Array.from(spollersArray).filter((function (item, index, self) {
      return !item.dataset.spollers.split(",")[0];
    }));
    if (spollersRegular.length) initSpollers(spollersRegular);

    spollersArray.forEach(spollersBlock => {
      const mediaQuery = spollersBlock.dataset.spollers;
      if (mediaQuery) {
        const [maxWidth, type] = mediaQuery.split(",");
        const width = parseInt(maxWidth);

        if (type === "max" && window.innerWidth <= width) {
          if (!spollersBlock.classList.contains("_spoller-init")) {
            initSpollers([spollersBlock]);
          }
        } else if (type === "max" && window.innerWidth > width) {
          if (spollersBlock.classList.contains("_spoller-init")) {
            spollersBlock.classList.remove("_spoller-init");
            initSpollerBody(spollersBlock, false);
            spollersBlock.removeEventListener("click", setSpollerAction);
          }
        }
      }
    });

    function initSpollers(spollersArray, matchMedia = false) {
      spollersArray.forEach((spollersBlock => {
        spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
        if (matchMedia.matches || !matchMedia) {
          spollersBlock.classList.add("_spoller-init");
          initSpollerBody(spollersBlock);
          spollersBlock.addEventListener("click", setSpollerAction);

          initCloseButtons(spollersBlock);
        } else {
          spollersBlock.classList.remove("_spoller-init");
          initSpollerBody(spollersBlock, false);
          spollersBlock.removeEventListener("click", setSpollerAction);
        }
      }));
    }

    function initSpollerBody(spollersBlock, hideSpollerBody = true) {
      let spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
      if (spollerTitles.length) {
        spollerTitles = Array.from(spollerTitles).filter((item => item.closest("[data-spollers]") === spollersBlock));
        spollerTitles.forEach((spollerTitle => {
          if (hideSpollerBody) {
            spollerTitle.removeAttribute("tabindex");
            if (!spollerTitle.classList.contains("_spoller-active")) {
              if (spollerTitle.nextElementSibling) {
                spollerTitle.nextElementSibling.hidden = true;
              }
            }
          } else {
            spollerTitle.setAttribute("tabindex", "-1");
            if (spollerTitle.nextElementSibling) {
              spollerTitle.nextElementSibling.hidden = false;
            }
          }
        }));
      }
    }

    function initCloseButtons(spollersBlock) {
      const closeButtons = spollersBlock.querySelectorAll('.cabinet-orders-spollers__button');

      closeButtons.forEach(button => {
        button.removeEventListener('click', closeSpollerHandler);
        button.addEventListener('click', closeSpollerHandler);
      });
    }

    function closeSpollerHandler(e) {
      e.preventDefault();
      e.stopPropagation();

      const button = e.currentTarget;
      const spollersBlock = button.closest('[data-spollers]');
      const spollerItem = button.closest('.cabinet-orders-spollers__item');

      if (spollersBlock && spollerItem) {
        const spollerTitle = spollerItem.querySelector('[data-spoller]');

        if (spollerTitle && spollerTitle.classList.contains('_spoller-active')) {
          const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;

          spollerTitle.classList.remove('_spoller-active');
          spollerItem.classList.remove('_spoller-active');

          const contentBlock = spollerTitle.nextElementSibling;
          _slideUp(contentBlock, spollerSpeed);
        }
      }
    }

    function setSpollerAction(e) {
      const el = e.target;
      const spollerTitle = el.closest("[data-spoller]");
      if (!spollerTitle) return;

      if (el.closest('a') && !spollerTitle.closest('a')) {
        return;
      }

      const spollerItem = spollerTitle.closest(".spollers__item, .cabinet-orders-spollers__item, .menu-catalog__item");
      const spollersBlock = spollerTitle.closest("[data-spollers]");

      if (!spollersBlock) return;

      const oneSpoller = spollersBlock.hasAttribute("data-one-spoller");
      const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;

      if (!spollersBlock.querySelectorAll("._slide").length) {
        if (oneSpoller && !spollerTitle.classList.contains("_spoller-active")) {
          hideSpollersBody(spollersBlock);
        }

        spollerTitle.classList.toggle("_spoller-active");
        if (spollerItem) spollerItem.classList.toggle("_spoller-active");

        const contentBlock = spollerTitle.nextElementSibling;
        if (contentBlock) {
          _slideToggle(contentBlock, spollerSpeed);
        }

        e.preventDefault();
      }
    }

    function hideSpollersBody(spollersBlock) {
      const spollerActiveTitle = spollersBlock.querySelector("[data-spoller]._spoller-active");
      const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
      if (spollerActiveTitle && !spollersBlock.querySelectorAll("._slide").length) {
        const spollerItem = spollerActiveTitle.closest(".spollers__item, .cabinet-orders-spollers__item, .menu-catalog__item");

        spollerActiveTitle.classList.remove("_spoller-active");
        if (spollerItem) spollerItem.classList.remove("_spoller-active");
        _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
      }
    }

    const spollersClose = document.querySelectorAll("[data-spoller-close]");
    if (spollersClose.length) {
      document.addEventListener("click", (function (e) {
        const el = e.target;
        if (!el.closest("[data-spollers]")) {
          spollersClose.forEach((spollerClose => {
            const spollersBlock = spollerClose.closest("[data-spollers]");
            const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
            spollerClose.classList.remove("_spoller-active");

            const spollerItem = spollerClose.closest(".spollers__item, .cabinet-orders-spollers__item, .menu-catalog__item");
            if (spollerItem) spollerItem.classList.remove("_spoller-active");

            _slideUp(spollerClose.nextElementSibling, spollerSpeed);
          }));
        }
      }));
    }
  }
}

spollers();
window.addEventListener('resize', function () {
  spollers();
});

//========================================================================================================================================================

console.log('🚀 Запуск инициализации квизов');

// Код квиза с поддержкой нескольких экземпляров и управлением через кнопки
document.querySelectorAll('.block-quiz-steps__slider').forEach((sliderElement, index) => {
  console.log(`📌 Инициализация квиза #${index + 1}`);

  let swiperQuiz = null;
  let selectedAnswers = [];
  let timerInterval = null;
  let timerSeconds = 120;
  let isQuizCompleted = false;

  // Определяем количество вопросов для каждого квиза
  const totalQuestions = index === 0 ? 5 : 4;
  console.log(`📊 Квиз #${index + 1}: ${totalQuestions} вопросов`);

  // Находим родительский блок квиза
  const quizBlock = sliderElement.closest('.block-quiz');
  console.log(`🔍 Квиз #${index + 1}: найден блок`, quizBlock);

  if (!quizBlock) {
    console.error(`❌ Квиз #${index + 1}: не найден родительский блок .block-quiz`);
    return;
  }

  // Функция для проверки наличия кнопки btn-next в слайде
  function hasNextButton(slide) {
    return slide.querySelector('.btn-next') !== null;
  }

  // Функция для обновления номера вопроса и текста
  function updateQuestionInfo() {
    if (!swiperQuiz) {
      console.log(`⚠️ Квиз #${index + 1}: updateQuestionInfo - swiperQuiz не инициализирован`);
      return;
    }

    const currentSlideIndex = swiperQuiz.activeIndex;
    console.log(`📝 Квиз #${index + 1}: updateQuestionInfo - текущий слайд: ${currentSlideIndex}`);

    const questionNumberSpan = quizBlock.querySelector('.block-quiz-steps__questions-text span');

    if (questionNumberSpan) {
      if (currentSlideIndex === totalQuestions) {
        questionNumberSpan.textContent = totalQuestions;
        console.log(`📝 Квиз #${index + 1}: установлен номер вопроса: ${totalQuestions} (финальный)`);
      } else {
        questionNumberSpan.textContent = currentSlideIndex + 1;
        console.log(`📝 Квиз #${index + 1}: установлен номер вопроса: ${currentSlideIndex + 1}`);
      }
    } else {
      console.log(`⚠️ Квиз #${index + 1}: questionNumberSpan не найден`);
    }
  }

  // Функция для обновления прогресс-бара
  function updateProgressBar() {
    if (!swiperQuiz) {
      console.log(`⚠️ Квиз #${index + 1}: updateProgressBar - swiperQuiz не инициализирован`);
      return;
    }

    const currentSlideIndex = swiperQuiz.activeIndex;
    console.log(`📊 Квиз #${index + 1}: updateProgressBar - текущий слайд: ${currentSlideIndex}`);

    const pagination = quizBlock.querySelector('.swiper-pagination-progressbar');

    if (pagination) {
      const progressFill = pagination.querySelector('.swiper-pagination-progressbar-fill');
      if (progressFill) {
        let widthPercentage;

        if (currentSlideIndex === 0) {
          widthPercentage = 20;
        } else if (currentSlideIndex === totalQuestions) {
          widthPercentage = 100;
        } else {
          widthPercentage = ((currentSlideIndex + 1) / totalQuestions) * 100;
        }

        widthPercentage = Math.max(20, Math.min(100, widthPercentage));

        console.log(`📊 Квиз #${index + 1}: установка прогресса ${widthPercentage}%`);

        progressFill.style.transition = 'width 0.3s ease, transform 0.3s ease';
        progressFill.style.width = `${widthPercentage}%`;
        progressFill.style.transform = `translate3d(0px, 0px, 0px) scaleX(${widthPercentage / 100}) scaleY(1)`;
      } else {
        console.log(`⚠️ Квиз #${index + 1}: progressFill не найден`);
      }
    } else {
      console.log(`⚠️ Квиз #${index + 1}: pagination не найден`);
    }
  }

  // Функция для восстановления выбранных ответов
  function restoreSelectedAnswers() {
    if (!swiperQuiz) {
      console.log(`⚠️ Квиз #${index + 1}: restoreSelectedAnswers - swiperQuiz не инициализирован`);
      return;
    }

    const currentSlideIndex = swiperQuiz.activeIndex;
    console.log(`🔄 Квиз #${index + 1}: restoreSelectedAnswers - слайд ${currentSlideIndex}`);

    const slides = quizBlock.querySelectorAll('.block-quiz-steps__slide');

    if (currentSlideIndex === totalQuestions) {
      console.log(`🔄 Квиз #${index + 1}: финальный слайд, пропускаем восстановление`);
      return;
    }

    const slide = slides[currentSlideIndex];
    if (!slide) {
      console.log(`⚠️ Квиз #${index + 1}: слайд ${currentSlideIndex} не найден`);
      return;
    }

    // Проверяем все типы опций
    const hasOptions1 = slide.querySelector('.options1__item');
    const hasOptions2 = slide.querySelector('.options2__item');
    const hasOptions3 = slide.querySelector('.options3__item');

    let allOptions;
    if (hasOptions1) {
      allOptions = slide.querySelectorAll('.options1__item');
      console.log(`🔄 Квиз #${index + 1}: найдены options1 (${allOptions.length} шт)`);
    } else if (hasOptions2) {
      allOptions = slide.querySelectorAll('.options2__item');
      console.log(`🔄 Квиз #${index + 1}: найдены options2 (${allOptions.length} шт)`);
    } else if (hasOptions3) {
      allOptions = slide.querySelectorAll('.options3__item');
      console.log(`🔄 Квиз #${index + 1}: найдены options3 (${allOptions.length} шт)`);
    } else {
      console.log(`⚠️ Квиз #${index + 1}: опции не найдены на слайде ${currentSlideIndex}`);
      return;
    }

    // Сбрасываем все опции
    allOptions.forEach(opt => {
      const input = opt.querySelector('input[type="radio"]');
      if (input) {
        input.checked = false;
      }
      opt.classList.remove('active');
    });

    // Восстанавливаем сохраненный ответ
    if (selectedAnswers[currentSlideIndex]) {
      const savedAnswer = selectedAnswers[currentSlideIndex].answer;
      console.log(`🔄 Квиз #${index + 1}: восстанавливаем ответ: "${savedAnswer}"`);

      allOptions.forEach(option => {
        let textElement;
        if (hasOptions1) {
          textElement = option.querySelector('.options1__title');
        } else if (hasOptions2) {
          textElement = option.querySelector('.options2__text');
        } else if (hasOptions3) {
          textElement = option.querySelector('.options3__text');
        }

        if (textElement) {
          const optionText = textElement.textContent.trim();
          if (optionText === savedAnswer) {
            console.log(`🔄 Квиз #${index + 1}: найден совпадающий вариант: "${optionText}"`);
            const input = option.querySelector('input[type="radio"]');
            if (input) {
              input.checked = true;
            }
            option.classList.add('active');
          }
        }
      });
    } else {
      console.log(`🔄 Квиз #${index + 1}: нет сохраненного ответа для слайда ${currentSlideIndex}`);
    }

    if (currentSlideIndex !== 0 && currentSlideIndex !== totalQuestions) {
      updateNextButtonState(currentSlideIndex);
    }
  }

  // Функция для обновления состояния кнопки "Далее"
  function updateNextButtonState(slideIndex) {
    console.log(`🔘 Квиз #${index + 1}: updateNextButtonState - слайд ${slideIndex}`);

    const slides = quizBlock.querySelectorAll('.block-quiz-steps__slide');
    const slide = slides[slideIndex];
    if (!slide) {
      console.log(`⚠️ Квиз #${index + 1}: слайд ${slideIndex} не найден`);
      return;
    }

    const nextBtn = slide.querySelector('.btn-next');
    if (!nextBtn) {
      console.log(`ℹ️ Квиз #${index + 1}: кнопка btn-next не найдена на слайде ${slideIndex} (переход будет автоматическим)`);
      return;
    }

    const hasAnswer = selectedAnswers[slideIndex] !== undefined;
    console.log(`🔘 Квиз #${index + 1}: ответ выбран: ${hasAnswer}`);

    if (hasAnswer) {
      nextBtn.removeAttribute('disabled');
      nextBtn.style.opacity = '1';
      nextBtn.style.pointerEvents = 'auto';
      nextBtn.classList.add('active');
      console.log(`🔘 Квиз #${index + 1}: кнопка активирована`);
    } else {
      nextBtn.setAttribute('disabled', 'disabled');
      nextBtn.style.opacity = '0.5';
      nextBtn.style.pointerEvents = 'none';
      nextBtn.classList.remove('active');
      console.log(`🔘 Квиз #${index + 1}: кнопка деактивирована`);
    }
  }

  // Функция для перехода на следующий слайд (с проверкой)
  function goToNextSlide() {
    if (!swiperQuiz) return;

    const currentSlideIndex = swiperQuiz.activeIndex;
    const slides = quizBlock.querySelectorAll('.block-quiz-steps__slide');

    if (currentSlideIndex < slides.length - 1) {
      swiperQuiz.slideNext();
      console.log(`➡️ Квиз #${index + 1}: переход на следующий слайд`);
      return true;
    }
    return false;
  }

  // Функция для обработки выбора опции
  function handleOptionSelection(slideIndex, answerText, optionElement) {
    console.log(`📝 Квиз #${index + 1}: обработка выбора опции на слайде ${slideIndex}`);

    const slides = quizBlock.querySelectorAll('.block-quiz-steps__slide');
    const slide = slides[slideIndex];
    const questionTitle = slide.querySelector('.block-quiz-steps__title')?.textContent || `Вопрос ${slideIndex + 1}`;

    // Сохраняем ответ
    selectedAnswers[slideIndex] = {
      question: questionTitle,
      answer: answerText
    };
    console.log(`📝 Квиз #${index + 1}: сохранен ответ для слайда ${slideIndex}: "${answerText}"`);

    // Активируем опцию
    const allOptions = slide.querySelectorAll('.options1__item, .options2__item, .options3__item');
    allOptions.forEach(opt => {
      opt.classList.remove('active');
      const input = opt.querySelector('input[type="radio"]');
      if (input) {
        input.checked = false;
      }
    });

    optionElement.classList.add('active');
    const radioInput = optionElement.querySelector('input[type="radio"]');
    if (radioInput) {
      radioInput.checked = true;
    }

    // Проверяем наличие кнопки btn-next в слайде
    const hasBtn = hasNextButton(slide);
    console.log(`🔍 Квиз #${index + 1}: наличие btn-next в слайде: ${hasBtn}`);

    if (hasBtn) {
      // Если есть кнопка - активируем её, переход только по клику
      console.log(`🔘 Квиз #${index + 1}: есть кнопка - активируем, ждем клика`);
      updateNextButtonState(slideIndex);
    } else {
      // Если нет кнопки - автоматический переход
      console.log(`🚀 Квиз #${index + 1}: нет кнопки - автоматический переход`);
      setTimeout(() => {
        goToNextSlide();
      }, 400);
    }
  }

  // Таймер
  function startTimer() {
    if (timerInterval) {
      console.log(`⏱️ Квиз #${index + 1}: таймер уже запущен`);
      return;
    }

    console.log(`⏱️ Квиз #${index + 1}: запуск таймера`);
    timerSeconds = 120;

    const timeElement = quizBlock.querySelector('.block-quiz-steps__time');
    if (timeElement) {
      timeElement.textContent = '2 минуты';
    }

    timerInterval = setInterval(() => {
      timerSeconds--;
      const minutes = Math.floor(timerSeconds / 60);
      const seconds = timerSeconds % 60;

      const timeElement = quizBlock.querySelector('.block-quiz-steps__time');
      if (timeElement) {
        timeElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
      }

      if (timerSeconds <= 0) {
        console.log(`⏱️ Квиз #${index + 1}: время вышло!`);
        stopTimer();
        alert('Время вышло!');
      }
    }, 1000);
  }

  function stopTimer() {
    if (timerInterval) {
      console.log(`⏱️ Квиз #${index + 1}: остановка таймера`);
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  function resetTimer() {
    console.log(`⏱️ Квиз #${index + 1}: сброс таймера`);
    timerSeconds = 120;
    const timeElement = quizBlock.querySelector('.block-quiz-steps__time');
    if (timeElement) {
      timeElement.textContent = '2 минуты';
    }
  }

  // Проверяем наличие элементов перед инициализацией Swiper
  console.log(`🔍 Квиз #${index + 1}: проверка элементов`);
  const paginationEl = quizBlock.querySelector('.block-quiz-steps__pagination');
  console.log(`  - pagination: ${paginationEl ? 'найден' : 'НЕ НАЙДЕН'}`);

  // Инициализация Swiper
  console.log(`🔄 Квиз #${index + 1}: инициализация Swiper`);

  swiperQuiz = new Swiper(sliderElement, {
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 0,
    speed: 200,
    allowTouchMove: false,
    simulateTouch: false,
    initialSlide: 0,
    pagination: {
      el: paginationEl,
      type: 'progressbar',
      clickable: false,
    },
    on: {
      slideChange: function () {
        console.log(`🔄 Квиз #${index + 1}: slideChange - переход на слайд ${this.activeIndex}`);
        updateQuestionInfo();
        restoreSelectedAnswers();

        setTimeout(() => {
          updateProgressBar();
        }, 50);

        if (this.activeIndex === totalQuestions) {
          if (!isQuizCompleted) {
            console.log(`🔄 Квиз #${index + 1}: достигнут финальный слайд, запуск таймера`);
            startTimer();
          }
        } else {
          stopTimer();
          resetTimer();
        }
      },
      init: function () {
        console.log(`✅ Квиз #${index + 1}: Swiper инициализирован`);
        updateQuestionInfo();

        setTimeout(() => {
          const progressFill = quizBlock.querySelector('.swiper-pagination-progressbar-fill');
          if (progressFill) {
            console.log(`📊 Квиз #${index + 1}: установка начального прогресса 20%`);
            progressFill.style.transition = 'none';
            progressFill.style.width = '20%';
            progressFill.style.transform = 'translate3d(0px, 0px, 0px) scaleX(0.2) scaleY(1)';

            setTimeout(() => {
              progressFill.style.transition = 'width 0.3s ease, transform 0.3s ease';
            }, 50);
          } else {
            console.log(`⚠️ Квиз #${index + 1}: progressFill не найден при инициализации`);
          }
        }, 100);

        setTimeout(() => {
          restoreSelectedAnswers();
        }, 200);
      }
    }
  });

  console.log(`✅ Квиз #${index + 1}: Swiper создан`);

  // Блокируем клик по слайду - переход только через кнопки
  sliderElement.addEventListener('click', function (e) {
    const target = e.target;
    const isButton = target.closest('.btn-next') || target.closest('.btn-back') || target.closest('.btn-send');
    const isOption = target.closest('.options1__item') || target.closest('.options2__item') || target.closest('.options3__item');

    // Если клик не по кнопке и не по опции - блокируем
    if (!isButton && !isOption) {
      console.log(`🚫 Квиз #${index + 1}: клик заблокирован (не по кнопке или опции)`);
      e.stopPropagation();
      e.preventDefault();
      return false;
    }
  });

  // Обработчик для кнопок "Назад" внутри слайдов
  const backButtons = quizBlock.querySelectorAll('.btn-back');
  console.log(`🔙 Квиз #${index + 1}: найдено ${backButtons.length} кнопок "Назад"`);

  backButtons.forEach((btn) => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      console.log(`🔙 Квиз #${index + 1}: клик по кнопке "Назад"`);

      if (!swiperQuiz) {
        console.log(`⚠️ Квиз #${index + 1}: swiperQuiz не инициализирован`);
        return;
      }

      const currentSlideIndex = swiperQuiz.activeIndex;
      console.log(`🔙 Квиз #${index + 1}: текущий слайд ${currentSlideIndex}`);

      if (currentSlideIndex === 0) {
        console.log(`🔙 Квиз #${index + 1}: закрытие квиза`);
        document.documentElement.classList.remove('open-quiz');
      } else if (currentSlideIndex > 0) {
        console.log(`🔙 Квиз #${index + 1}: переход на предыдущий слайд`);
        swiperQuiz.slidePrev();
      }
    });
  });

  // Обработчик для кнопок "Далее"
  const nextButtons = quizBlock.querySelectorAll('.btn-next');
  console.log(`🔜 Квиз #${index + 1}: найдено ${nextButtons.length} кнопок "Далее"`);

  nextButtons.forEach((btn) => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      console.log(`🔜 Квиз #${index + 1}: клик по кнопке "Далее"`);

      if (!swiperQuiz) {
        console.log(`⚠️ Квиз #${index + 1}: swiperQuiz не инициализирован`);
        return;
      }

      const currentSlideIndex = swiperQuiz.activeIndex;
      console.log(`🔜 Квиз #${index + 1}: текущий слайд ${currentSlideIndex}`);

      // Проверяем, что ответ выбран
      if (!selectedAnswers[currentSlideIndex]) {
        console.log(`⚠️ Квиз #${index + 1}: ответ не выбран для слайда ${currentSlideIndex}`);
        // Визуальная подсказка
        const slides = quizBlock.querySelectorAll('.block-quiz-steps__slide');
        const slide = slides[currentSlideIndex];
        const options = slide.querySelectorAll('.options1__item, .options2__item, .options3__item');
        options.forEach(opt => {
          opt.style.animation = 'shake 0.5s';
          setTimeout(() => {
            opt.style.animation = '';
          }, 500);
        });
        return;
      }

      goToNextSlide();
    });
  });

  // Обработчик для опций options1
  const options1 = quizBlock.querySelectorAll('.options1__item');
  console.log(`🖼️ Квиз #${index + 1}: найдено ${options1.length} опций options1`);

  options1.forEach((optionItem) => {
    optionItem.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      console.log(`🖼️ Квиз #${index + 1}: клик по опции options1`);

      if (!swiperQuiz) {
        console.log(`⚠️ Квиз #${index + 1}: swiperQuiz не инициализирован`);
        return;
      }

      const currentSlideIndex = swiperQuiz.activeIndex;

      if (this.classList.contains('active')) {
        console.log(`🖼️ Квиз #${index + 1}: опция уже активна`);
        return;
      }

      const textElement = this.querySelector('.options1__title');
      let answerText = textElement ? textElement.textContent.trim() : '';
      console.log(`🖼️ Квиз #${index + 1}: выбран ответ: "${answerText}"`);

      handleOptionSelection(currentSlideIndex, answerText, this);
    });
  });

  // Обработчик для опций options2
  const options2 = quizBlock.querySelectorAll('.options2__item');
  console.log(`📋 Квиз #${index + 1}: найдено ${options2.length} опций options2`);

  options2.forEach((optionItem) => {
    optionItem.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      console.log(`📋 Квиз #${index + 1}: клик по опции options2`);

      if (!swiperQuiz) {
        console.log(`⚠️ Квиз #${index + 1}: swiperQuiz не инициализирован`);
        return;
      }

      const currentSlideIndex = swiperQuiz.activeIndex;

      // Пропускаем первый и финальный слайды
      if (currentSlideIndex === 0 || currentSlideIndex === totalQuestions) {
        console.log(`📋 Квиз #${index + 1}: слайд ${currentSlideIndex} - пропускаем (первый или финальный)`);
        return;
      }

      const isActive = this.classList.contains('active');

      if (isActive) {
        // Если опция уже активна - снимаем выбор
        console.log(`📋 Квиз #${index + 1}: снимаем выбор`);
        this.classList.remove('active');
        const radioInput = this.querySelector('input[type="radio"]');
        if (radioInput) {
          radioInput.checked = false;
        }
        delete selectedAnswers[currentSlideIndex];
        updateNextButtonState(currentSlideIndex);
        return;
      }

      const textElement = this.querySelector('.options2__text');
      let answerText = textElement ? textElement.textContent.trim() : '';
      console.log(`📋 Квиз #${index + 1}: выбран ответ: "${answerText}"`);

      handleOptionSelection(currentSlideIndex, answerText, this);
    });
  });

  // Обработчик для опций options3
  const options3 = quizBlock.querySelectorAll('.options3__item');
  console.log(`📋 Квиз #${index + 1}: найдено ${options3.length} опций options3`);

  options3.forEach((optionItem) => {
    optionItem.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      console.log(`📋 Квиз #${index + 1}: клик по опции options3`);

      if (!swiperQuiz) {
        console.log(`⚠️ Квиз #${index + 1}: swiperQuiz не инициализирован`);
        return;
      }

      const currentSlideIndex = swiperQuiz.activeIndex;

      if (currentSlideIndex !== 0) {
        console.log(`📋 Квиз #${index + 1}: не первый слайд, игнорируем`);
        return;
      }

      if (this.classList.contains('active')) {
        console.log(`📋 Квиз #${index + 1}: опция уже активна`);
        return;
      }

      const textElement = this.querySelector('.options3__text');
      let answerText = textElement ? textElement.textContent.trim() : '';
      console.log(`📋 Квиз #${index + 1}: выбран ответ: "${answerText}"`);

      handleOptionSelection(currentSlideIndex, answerText, this);
    });
  });

  // Функция подготовки данных для отправки
  function prepareQuizData() {
    console.log(`📤 Квиз #${index + 1}: подготовка данных для отправки`);

    const answeredCount = selectedAnswers.filter(ans => ans !== undefined).length;
    console.log(`📤 Квиз #${index + 1}: отвечено ${answeredCount} из ${totalQuestions} вопросов`);

    if (answeredCount < totalQuestions) {
      console.log(`⚠️ Квиз #${index + 1}: не все вопросы отвечены`);
      alert(`Пожалуйста, ответьте на все ${totalQuestions} вопросов. Отвечено: ${answeredCount}`);
      return null;
    }

    const formData = new FormData();

    const questionMapping = {
      0: 'location',
      1: 'size',
      2: 'facade',
      3: 'telegram',
      4: 'max_name'
    };

    selectedAnswers.forEach((answer, idx) => {
      if (answer && questionMapping[idx]) {
        console.log(`📤 Квиз #${index + 1}: добавляем ${questionMapping[idx]} = "${answer.answer}"`);
        formData.append(questionMapping[idx], answer.answer);
      }
    });

    return formData;
  }

  // Обработчик отправки формы
  const sendButton = quizBlock.querySelector('.btn-send');
  if (sendButton) {
    console.log(`📨 Квиз #${index + 1}: найдена кнопка отправки`);

    sendButton.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      console.log(`📨 Квиз #${index + 1}: клик по кнопке "Отправить"`);

      const formData = prepareQuizData();
      if (!formData) {
        console.log(`❌ Квиз #${index + 1}: данные не готовы, отправка отменена`);
        return;
      }

      isQuizCompleted = true;
      stopTimer();
      console.log(`✅ Квиз #${index + 1}: все вопросы отвечены, отправка формы`);

      const form = quizBlock.querySelector('.block-quiz-steps');
      if (form) {
        // Удаляем старые скрытые поля
        form.querySelectorAll('input[type="hidden"]').forEach(input => {
          if (['location', 'size', 'facade', 'telegram', 'max_name'].includes(input.name)) {
            console.log(`📨 Квиз #${index + 1}: удаляем скрытое поле ${input.name}`);
            input.remove();
          }
        });

        // Добавляем новые скрытые поля с ответами
        const questionMapping = {
          0: 'location',
          1: 'size',
          2: 'facade',
          3: 'telegram',
          4: 'max_name'
        };

        selectedAnswers.forEach((answer, idx) => {
          if (answer && questionMapping[idx]) {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = questionMapping[idx];
            input.value = answer.answer;
            form.appendChild(input);
            console.log(`📨 Квиз #${index + 1}: добавлено скрытое поле ${questionMapping[idx]} = "${answer.answer}"`);
          }
        });

        // Отправляем форму
        console.log(`📨 Квиз #${index + 1}: отправка формы`);
        const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
        form.dispatchEvent(submitEvent);
      } else {
        console.log(`❌ Квиз #${index + 1}: форма не найдена`);
      }
    });
  } else {
    console.log(`⚠️ Квиз #${index + 1}: кнопка отправки не найдена`);
  }

  // Добавляем анимацию для подсказки
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      75% { transform: translateX(5px); }
    }
  `;
  document.head.appendChild(style);

  console.log(`✅ Квиз #${index + 1}: инициализация завершена`);
});

console.log('✅ Все квизы инициализированы');