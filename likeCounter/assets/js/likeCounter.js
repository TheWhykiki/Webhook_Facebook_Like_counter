var clock;

$(document).ready(function() {

    /*****************************************************************************************************************************************************/
    /* Variablen */
    /*****************************************************************************************************************************************************/

    var fan_count = 0;

    /*****************************************************************************************************************************************************/
    /* Get Initial Counter:
    * - FlipClock initialisieren und Fan Count auf korrekten Wert setzen
    * - bei Succes des Ajax Calls das RealTime und IntervalCounting starten
    */
    /*****************************************************************************************************************************************************/

    function getInitialCounter(){
        $.ajax({
            type: 'GET',
            url: 'https://eure-domain.de/likeCounter.json',
            dataType: 'json',
            success: function (data) {
                console.log(data.fan_count);
                fan_count = parseInt(data.fan_count);

                startRealTimeCounting();
                startIntervalCounting();

                clock = $('.counter').FlipClock(fan_count, {
                    clockFace: 'Counter',
                    autoStart: false,
                    minimumDigits: 4,
                    callbacks: {
                        start: function() {
                            $('.message').html('The clock has started!');
                        },
                        stop: function() {
                            $('.message').html('The clock has stopped!');
                        }
                    }
                });
            }
        });
    }

    /*****************************************************************************************************************************************************/
    /* Get Realtime Likes:
    * - alle 1000ms den Counterwert aus der gepeicherten Datei auslesen
    */
    /*****************************************************************************************************************************************************/

    function getRealTimeLikes(){
        $.ajax({
            type: 'GET',
            url: 'https://eure-domain.de/likeCounter.json',
            dataType: 'json',
            success: function (data) {
                fanCounter = parseInt(data.fan_count);
                console.log(fanCounter);

                if(fanCounter > fan_count){
                    fan_count = fan_count + 1;
                    clock.increment();
                }
                else if(fanCounter == fan_count){
                    clock.stop();
                }
                else if(fanCounter < fan_count){
                    fan_count = fan_count - 1;
                    clock.decrement();
                }
            }
        });
    }

    /*****************************************************************************************************************************************************/
    /* Get Interval Likes:
    * - triggert nur einen Ajax Call, der den Fan Count von Facebook abruft und in der Datei aktualisiert
    */
    /*****************************************************************************************************************************************************/

    function getIntervalLikes(url){
        $.ajax({
            type: 'POST',
            url: url
        });
    }

    /*****************************************************************************************************************************************************/
    /* INtervallzeiten setzen
    *
    */
    /*****************************************************************************************************************************************************/

    function startRealTimeCounting(){
        setInterval(function(){

            getRealTimeLikes();

                console.log(fan_count)
            },
            1000);
    }

    function startIntervalCounting(){
        setInterval(function(){
                url = 'https://eure-domain.de/interval_likes.php';
                getIntervalLikes(url);
                console.log(fan_count)
            },
            15000);
    }

    getInitialCounter();

});