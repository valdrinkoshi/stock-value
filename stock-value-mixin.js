(scope => {
  // Don't override the mixin if the script gets loaded twice.
  if (scope.StockValueMixin) return;

  scope.StockValueMixin = BaseClass => {
    return class extends BaseClass {

      static get observedAttributes() {
        return ['current', 'previous', 'only'];
      }

      attributeChangedCallback(name, old, value) {
        // Skip updating properties when e.g. `old = "1"` and `value = 1`
        if (old != value) {
          // Convert to number only if attribute is current or previous.
          value = name === 'only' ? value : Number(value);
          // Wait all attributes to be done changing.
          this._attributesChangingDebouncer && clearTimeout(this._attributesChangingDebouncer);
          this._attributesChangingDebouncer = setTimeout(() => {
            this._attributesChangingDebouncer = null;
            this._updateDifferencePercent();
          });
          this[name] = value;
        }
      }

      constructor() {
        super();

        /**
         * @type {number|null}
         * @private
         */
        this._attributesChangingDebouncer = null;

        /**
         * @type {!Object}
         * @private
         */
        this._props = {
          current: null,
          previous: null,
          only: null,
          difference: 0,
          percent: 0
        };

        /**
         * @type {Element|null}
         * @private
         */
        this._wrapperEl = null;
      }

      connectedCallback() {
        super.connectedCallback && super.connectedCallback();
        if (!this._wrapperEl) {
          this._wrapperEl = this.wrapperElement;
          this._updateDifferencePercent();
        }
      }

      /** 
       * The current value.
       * @type {number|null}
       */
      get current() {
        return this._props.current;
      }

      /** 
       * @param {number|null}
       * @returns {number|null}
       */
      set current(c) {
        // Accept null or Number.
        if (c !== null && !Number.isFinite(c)) c = null;
        if (c === this._props.current) return;
        this._props.current = c;
        this._updateDifferencePercent();
        return c;
      }

      /** 
       * The previous value.
       * @type {number|null}
       */
      get previous() {
        return this._props.previous;
      }

      /** 
       * @param {number|null}
       * @returns {number|null}
       */
      set previous(c) {
        // Accept null or Number.
        if (c !== null && !Number.isFinite(c)) c = null;
        if (c === this._props.previous) return;
        this._props.previous = c;
        this._updateDifferencePercent();
        return c;
      }

      /** 
       * Set to 'difference' or 'percent' to change what is displayed.
       * Unset to display both (default). 
       * @type {string|null}
       */
      get only() {
        return this._props.only;
      }

      /** 
       * @param {string|null}
       * @returns {string|null}
       */
      set only(c) {
        // Accept only 'percent' or 'difference'.
        if (c !== 'percent' && c !== 'difference') c = null;
        if (c === this._props.only) return c;
        this._props.only = c;
        this._updateTextcontent();
        return c;
      }

      /** 
       * The difference.
       * @type {!number}
       */
      get difference() {
        return this._props.difference;
      }

      /** 
       * The difference percent.
       * @type {!number}
       */
      get percent() {
        return this._props.percent;
      }

      /** 
       * The element where to set the formatted differences.
       * @type {Element|null}
       * @override
       */
      get wrapperElement() {
        return this;
      }

      /** 
       * @private
       */
      _updateDifferencePercent() {
        const cur = this.current,
          prev = this.previous,
          diff = (cur === null || prev === null) ? 0 : cur - prev,
          perc = (!diff || !prev) ? 0 : 100 * (diff / prev);

        this._props.difference = diff;
        this._props.percent = perc;

        if (this._attributesChangingDebouncer || !this._wrapperEl) return;

        this._wrapperEl.classList.toggle('neutral', diff === 0);
        this._wrapperEl.classList.toggle('up', diff > 0);
        this._wrapperEl.classList.toggle('down', diff < 0);
        this._updateTextcontent();
      }

      /** 
       * @private
       */
      _updateTextcontent() {
        if (this._attributesChangingDebouncer || !this._wrapperEl) return;
        let tc;
        switch (this.only) {
          case 'difference':
            tc = this._computeFmtValue(this.difference);
            break;
          case 'percent':
            tc = this._computeFmtValue(this.percent) + '%';
            break;
          default:
            tc = this._computeFmtValue(this.difference) + ' (' + this._computeFmtValue(this.percent) + '%)';
            break;
        }
        this._wrapperEl.textContent = tc;
      }

      /** 
       * @private
       */
      _computeFmtValue(value) {
        return (value > 0 ? '+' : '') + value.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: Math.abs(value * 100) < 1 ? 4 : 2
        });
      }
    }
  };
})(window);