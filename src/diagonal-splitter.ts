import './diagonal-splitter.less';


class DiagonalSplitter {
  

    private root;
    private movingPart; 
    private movingChild;
    private btnLeft;
    private btnRight;
    private diagonalWidth;
    private options = {
      selector: "",
      switchDuration: 500,
      angle: 70,
      offset: -200,
      onLeft: null,
      onRight: null,
      onCenter: null
    };

    public init =  (_options) => {
      this.options = {...this.options, ..._options};
      if (this.options.selector.length == 0)  {
          throw('Selector not passed!')
      }
      try {
      this.root = $(this.options.selector).eq(0);
      }
      catch(ex) {
          console.warn('Invalid selector, ' + ex);
          throw(ex);
      }

      this.movingPart = this.root.find(".moving-part");
      this.movingChild = this.root.find(".moving-part>div");
      this.movingPart.css({ transform: `skewX(${this.options.angle}deg)`, transition: `${this.options.switchDuration}ms` });
      this.movingChild.css({ transform: `skewX(${-this.options.angle}deg)`, transition: `${this.options.switchDuration}ms` });
      this.btnLeft = this.root.find("#btn-left");
      this.btnRight = this.root.find("#btn-right");
      this.diagonalWidth = this.root.height() * Math.tan(Math.PI / 180 * this.options.angle);
      this.movingPart.width(this.root.width() * 5);
      this.movingChild.width(this.root.width());
      this.center();
      this.initEvents();
    }

    private initEvents() {
      if (this.btnLeft.length && this.btnRight.length) {
        this.btnLeft.mouseenter(() => {
          this.left();
          this.btnRight.fadeOut();
          return false;
        });
        this.btnRight.mouseenter(() => {
          this.right();
          this.btnLeft.fadeOut();
          return false;
        });
      } else {
        this.root.mouseenter((ev) => {
          if ($(ev.target).closest(".moving-part").length) this.right();
          else this.left();
          return false;
        });
        this.movingPart.mouseenter(() => {
          this.right();
          return false;
        });
        this.movingPart.mouseleave(() => this.left());
      }

      this.btnRight
        .add(this.btnLeft)
        .add(this.root)
        .mouseleave(() => {
          this.center();
          this.btnLeft.fadeIn();
          this.btnRight.fadeIn();
        });
    }

    public center = () => {
      this.moveTo(this.root.width() / 2 + this.diagonalWidth / 2);
      if (this.options.onCenter) this.options.onCenter();
    }

    public left = () => {
      if (this.options.angle > 45) this.moveTo(this.diagonalWidth - this.options.offset);
      else this.moveTo(this.root.width() + this.options.offset);
      if (this.options.onLeft) this.options.onLeft();
    }

    public right = () => {
      if (this.options.angle > 45) this.moveTo(this.root.width() + this.options.offset);
      else this.moveTo(this.diagonalWidth - this.options.offset);
      if (this.options.onRight) this.options.onRight();
    }

    private moveTo(length) {
    //   this.movingPart
    //     .stop()
    //     .animate(
    //       { left: -this.diagonalWidth / 2 + length + "px" },
    //       { duration: this.options.switchDuration, queue: false }
    //     );
    //   this.movingChild
    //     .stop()
    //     .animate(
    //       { "margin-left": this.diagonalWidth / 2 - length + "px" },
    //       { duration: this.options.switchDuration, queue: false }
    //     );
 
        this.movingPart
         
            .css({ transform: `translate3d(${-this.diagonalWidth / 2 + length}px, 0,0) skewX(${this.options.angle}deg)`}
          );
        this.movingChild
            .css({ transform: `translate3d(${this.diagonalWidth / 2 - length}px,0,0) skewX(${-this.options.angle}deg)` }
          );
      }
    }


    (window as any).DiagonalSplitter = DiagonalSplitter;




