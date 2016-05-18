(function() {
    $('#submit').click(function() {
        var css = ''
        var classSuffix = '';
        var answers = [];
        
        
        
        answers.minify = true;
        
        $(".dependents").children("input:checked").each(function(){
            
            if($(this).attr('name') == 'check') {
                answers.options = ($(this).attr('id') == 'percentage') ? '%' : $(this).attr('id');
            }
            
            // Range Start
            
            answers.rangestart = $('#range-start').val();
            
            // Range End
            
            answers.rangeend = $('#range-end').val();
            
            
            if($(this).attr('name') == 'mcheck') {
                answers.margin = ($(this).attr('id') == 'myes') ? true : false;
            }
            
            if($(this).attr('name') == 'pcheck') {
                answers.padding = ($(this).attr('id') == 'pyes') ? true : false;
            }
            
            if($(this).attr('name') == 'mucheck') {
                answers.more = ($(this).attr('id') == 'muyes') ? true : false;
            }
            
            if($(this).attr('name') == 'mfycheck') {
                answers.minify = ($(this).attr('id') == 'mfyes') ? true : false;
            }
        });
        
        if(!answers.options) {
            alert("Please select atleast one sizing element !");
            return;
        }
        
        if(!answers.rangestart || !answers.rangeend) {
            alert("Range");
            return;
        }
        
        if (!answers.margin && !answers.padding) {
            alert('Please select atleast one, margin or padding !');
            return;
        }
        
        // suffix [px, em, rem, %]
            switch (answers.options) {
                case 'px':
                    classSuffix = 'x'
                    break
                case 'em':
                    classSuffix = 'e'
                    break
                case 'rem':
                    classSuffix = 'r'
                    break
                case '%':
                    classSuffix = 'pr'
                    break
            }

            for (var i = answers.rangestart; i <= answers.rangeend; i++) {
                if (answers.margin) {
                    css += '.m' + i + classSuffix + '{\n    margin:' + i + '' + answers.options + ';\n}\n'

                    css += '.mt' + i + classSuffix + '{\n    margin-top:' + i + '' + answers.options + ';\n}\n'

                    css += '.mr' + i + classSuffix + '{\n    margin-right:' + i + '' + answers.options + ';\n}\n'

                    css += '.mb' + i + classSuffix + '{\n    margin-bottom:' + i + '' + answers.options + ';\n}\n'

                    css += '.ml' + i + classSuffix + '{\n    margin-left:' + i + '' + answers.options + ';\n}\n'
                }

                if (answers.padding) {
                    css += '.p' + i + classSuffix + '{\n    padding:' + i + '' + answers.options + ';\n}\n'

                    css += '.pt' + i + classSuffix + '{\n    padding-top:' + i + '' + answers.options + ';\n}\n'

                    css += '.pr' + i + classSuffix + '{\n    padding-right:' + i + '' + answers.options + ';\n}\n'

                    css += '.pb' + i + classSuffix + '{\n    padding-bottom:' + i + '' + answers.options + ';\n}\n'

                    css += '.pl' + i + classSuffix + '{\n    padding-left:' + i + '' + answers.options + ';\n}\n'
                }
            }

            if (answers.more) {
                css += '.db{display:block}.dib{display:inline-block}.di{display:inline}.dt{display:table}.dtc{display:table-cell}.fl{float:left}.fr{float:right}.oh{overflow:hidden}.cb,.clear{clear:both}'
            }
        
        if(answers.minify) {
            css = css.replace(/(\r\n|\n|\r)/gm,'').replace(/ /g,'').replace(/;/g,'');
        }
           
            $('.row.eight').empty().html('<h2 class="tal">Output:</h2><textarea id="output">'+css+'</textarea>');
    })
})();