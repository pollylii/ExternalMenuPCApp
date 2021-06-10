import pdf from 'pdfvuer'
import { MessageBox } from 'mint-ui'


export default {
    name: "PDFViewer",
    components: {
        pdf
    },
    props: ['path', 'password', 'intoPDF', 'filename', 'promptPassword'],
    data() {
        return {
            numPages: 0,
            CurrPage: 1,
            pdfdata: undefined,
            scale: 1,
            PDFViewer: null,
            base64: undefined,
            pdfPath: '',
            showPDF: false,
            title: '',
            originalscale: 0.5,
            formattedscale: 100,
            dialogFullScreen: false,
            passwordAttempt: 0
        }
    },
    watch: {
        intoPDF: function(dis) {
            var me = this;

            // *** Check Browser Compatibility
            var nVer = navigator.appVersion;
            var nAgt = navigator.userAgent;
            var CanPreview = 0;

            if (nAgt.indexOf("Chrome") != -1 || nAgt.indexOf("Firefox") != -1) {
                CanPreview = 1;
            }

            console.log(`=== Browser Preview Compatible : ${CanPreview==1} ===`);
            // =================================

            me.passwordAttempt = 0;

            if (CanPreview) {
                if (dis) {
                    if (me.promptPassword) {
                        me.inputPassword();
                    } else {
                        me.GenPDF();
                    }
                } else {
                    this.password = "";
                    this.$parent.intoPDF = false;
                }
            } else {
                this.exportPDF();
            }

        },
        showPDF: function(spdf) {

            console.log('==================================width==================================')
            setTimeout(() => {
                var pdfpages = document.getElementsByClassName('pdfwrapper');
                var dialog = document.getElementsByClassName('main-container');
                console.log(pdfpages)
                console.log(dialog)
                console.log('dialog w = ' + dialog[0].offsetWidth)
                console.log('pdfpages w = ' + pdfpages[0].offsetWidth)
                this.originalscale = dialog[0].offsetWidth / pdfpages[0].offsetWidth;
                this.scale = this.originalscale
                console.log(this.scale)
            }, 500);

            console.log('==================================width==================================')
        },
        password: function(pw) {
            console.log('latest pw = ' + pw)
                //this.GenPDF();
        },
        CurrPage: function(p) {
            console.log('page watchhhhhhhhhhhhhhhhhhhhhhhhh')
            if (window.pageYOffset <= this.findPos(document.getElementById(p)) || (document.getElementById(p + 1) && window.pageYOffset >= this.findPos(document.getElementById(p + 1)))) {
                // window.scrollTo(0,this.findPos(document.getElementById(p)));
                //document.getElementById(p).scrollIntoView();
            }
        },
        scale: function(s) {
            console.log(parseFloat(s).toFixed(1) * 100)
            console.log(1 - this.originalscale)
            this.formattedscale = parseFloat(s + (1 - this.originalscale)).toFixed(1) * 100
            if (this.formattedscale == 110.00000000000001) this.formattedscale = 110
            console.log(this.formattedscale)
        }
    },
    mounted() {
        var self = this;
        console.log(this.showPDF)

        console.log(this.intoPDF)


        console.log(window.innerWidth)
            //console.log(document.getElementsByClassName('outer-form'))


        /*
        MessageBox({
          title: 'Notice',
          message: 'Are you sure?',
          showCancelButton: true
        }).then(function() {
          self.GenPDF();
        });
        */
        //     console.log(document.getElementsByClassName('PDFcontainer'))
        //      self.displayPDF = document.getElementsByClassName('PDFcontainer')[0].style.display 
        /*
              console.log(document.getElementsByClassName('PDFcontainer')[0].style.display)
              MessageBox.prompt('Please enter the password', 'Password').then(({ value, action }) => {
                console.log(value)
                console.log(action)
                self.password = value
              });
        */
        console.log('mounted')
        console.log('hi')
        console.log("me", this);

    },
    methods: {
        GenPDF() {
            var self = this;
            console.log('GenPDF')
            console.log('path: ', self.path)
            console.log('password: ', self.password)
            var source = { url: self.path, password: self.password };
            self.pdfdata = pdf.createLoadingTask(source);
            //self.pdfdata = obj.data;
            //self.pdfdata = bin;
            self.pdfdata.then(pdf => {
                console.log('GenPDF Success')
                self.numPages = pdf.numPages;

                var pdfpage = document.getElementsByClassName('main-container')
                    //var pdfpage = [document.querySelector('.detect-scroll')];
                console.log('=======================pdfpage=======================')
                console.log(pdfpage)
                console.log('=======================pdfpage=======================')

                pdfpage[0].onscroll = function() {
                    //console.log('show')
                    changePage();
                }

                function changePage() {
                    // console.log('=============SCROLLING=============')
                    // console.log('Scrolled: ' + (pdfpage[0].scrollTop + 45))
                    // console.log('=============SCROLLED=============')
                    for (var i = 1; i <= Number(pdf.numPages); i++) {

                        if (i != Number(pdf.numPages)) {
                            //console.log('==================================' + i)
                            if (pdfpage[0].scrollTop + 100 >= self.findPos(document.getElementById(i)) &&
                                pdfpage[0].scrollTop + 100 <= self.findPos(document.getElementById(i + 1))) {
                                self.CurrPage = i;
                            }
                        } else {
                            if (pdfpage[0].scrollTop + 100 >= self.findPos(document.getElementById(i))) {
                                self.CurrPage = i
                            }
                        }
                        //console.log('------------------on page ' + self.CurrPage + '------------------');

                    }
                }
                return pdf;
            }).then(function(pdf) {
                console.log("small then");
                for (var i = 1; i <= Number(pdf.numPages); i++) {
                    console.log(i)
                    if (i == 1) {
                        document.getElementById(i).style.marginTop = '50px';
                    }
                    if (i == Number(pdf.numPages)) {
                        document.getElementById(i).style.marginBottom = '150px';
                    }
                }

                //       setTimeout(() => {
                console.log(document.getElementsByClassName('PDFcontainer'))
                console.log('-----=-===-=-=-=')
                self.showPDF = true
                    //     }, 500);

            }).catch(function(error) {
                console.log("Open PDF Error", error);
                //if (error.name == 'PasswordException') {
                if (error.code == 1 || error.code == 2) {
                    if (self.passwordAttempt < 2) {
                        self.inputPassword();
                    } else {
                        self.$alert(error.message)
                        self.$parent.intoPDF = false;
                    }
                } else {
                    self.$alert(
                        error.message,
                        self.getRes('common.ErrorOccur'),
                    );
                    self.$parent.intoPDF = false;
                }
            })

        },
        findPos(obj) {
            // console.log('------------------in obj------------------')
            // console.log(obj.offsetTop)
            // console.log('------------------out obj------------------')
            return obj.offsetTop;
        },
        nextbtn(pnum) {
            let newPage = (pnum != this.numPages) ? pnum + 1 : this.numPages;
            var xx = document.getElementsByClassName('main-container')
            console.log('=== Jump To Page: ' + newPage + ' ===')
            xx[0].scrollTo(0, this.findPos(document.getElementById(newPage)) - 100)
            this.CurrPage = newPage;
        },
        backbtn(pnum) {
            let newPage = (pnum != 1) ? pnum - 1 : 1
            var xx = document.getElementsByClassName('main-container')
            console.log('=== Jump To Page: ' + newPage + ' ===')
            xx[0].scrollTo(0, this.findPos(document.getElementById(newPage)) - 100)
            this.CurrPage = newPage;
        },
        inputPassword() {
            var me = this;
            me.passwordAttempt++;
            if (me.passwordAttempt <= 1) {
                me.$prompt(me.getRes('common.EnterPassword'), me.getRes('common.Password'), {
                    confirmButtonText: me.getRes('common.Confirm'),
                    cancelButtonText:  me.getRes('common.Cancel'),
                    inputErrorMessage: me.getRes('common.InCorrectPassword'), 
                    inputType: 'password'
                }).then(({ value }) => {
                    me.password = value;
                    me.GenPDF();
                }).catch(() => {
                    me.$message({
                        type: 'info',
                        message: me.getRes('common.InputCancelled')
                    });
                    me.$parent.intoPDF = false;
                });
            } else {
                me.$prompt(me.getRes('common.ReEnterPassword'), me.getRes('common.Password'), {
                    confirmButtonText: me.getRes('common.Confirm'),
                    cancelButtonText: me.getRes('common.Cancel'),
                    inputErrorMessage: me.getRes('common.InCorrectPassword')
                }).then(({ value }) => {
                    me.password = value;
                    me.GenPDF();
                }).catch(() => {
                    me.$message({
                        type: 'info',
                        message: me.getRes('common.InputCancelled')
                    });
                    me.$parent.intoPDF = false;
                });
            }

        },
        exportPDF() {
            var link = document.createElement('a');
            link.href = this.path;
            link.download = this.filename;
            link.click();
        },
    }
}