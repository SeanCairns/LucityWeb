(function (Filters, undefined)
{
    Lucity.Modules.Lucity
        .filter('reverse', function() {
            return function(input, uppercase) {
                input = input || '';
                var out = "";
                for (var i = 0; i < input.length; i++) {
                    out = input.charAt(i) + out;
                }
                // conditional based on optional argument
                if (uppercase) {
                    out = out.toUpperCase();
                }
                return out;
            };
        })
        .filter('split', function() {
            return function(input, splitChar, splitIndex) {
                return input.split(splitChar)[splitIndex];
            }
        })
        .filter('replace', function(){
            return function(input, replacedText, replacementText){
                return input.replace(replacedText, replacementText);
            }
        });
}(Lucity.Controllers = Lucity.Controllers || {} ));
