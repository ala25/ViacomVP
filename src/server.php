<?php
/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
$scriptInvokedFromCli =
    isset($_SERVER['argv'][0]) && $_SERVER['argv'][0] === 'server.php';

if($scriptInvokedFromCli) {
    $port = getenv('PORT');
    if (empty($port)) {
        $port = "8081";
    }

    echo 'starting server on port '. $port . PHP_EOL;
    exec('php -S localhost:'. $port . ' -t client server.php');
} else {
    return routeRequest();
}


function routeRequest()
{
    $uri = $_SERVER['REQUEST_URI'];
    if ($uri == '/') {
        echo file_get_contents('./client/index.html');
    }elseif(preg_match('/\/update(\?.*)?/', $uri)){
        $data = file_get_contents('./nextRes.json');
        header('Content-Type: application/json');
        header('Cache-Control: no-cache');
        header('Access-Control-Allow-Origin: *');
        echo $data;
    }
     elseif (preg_match('/\/videos(\?.*)?/', $uri)) {
        //$url =  'https://api.viacom.com/contents/v2/brands/cc/shows/7c2d44b4-c8b1-43a9-9bfc-32af988eab20/seasons/14a0c915-02b6-4dbe-8053-873c1f417447/episodes?apiKey=MfWXKoGVzh1nNAHI1uTWuw45VzcAUyOC&offset=0&limit=20';
        $data = file_get_contents('./res.json');
    //     $arr = array(
    //         'X-API-KEY:MfWXKoGVzh1nNAHI1uTWuw45VzcAUyOC'
    //     );

    // $curl = curl_init();
    // curl_setopt($curl, CURLOPT_URL, $url);
    // curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    // curl_setopt($curl, CURLOPT_HEADER, false);
    // curl_setopt($curl, CURLOPT_HTTPHEADER, $arr);

    //     $response = curl_exec($curl);
    //     curl_close($curl);
    //     header('Content-Type: application/json');
    //     header('Cache-Control: no-cache');
    //     header('Access-Control-Allow-Origin: *');
    //     header('X-API-KEY: MfWXKoGVzh1nNAHI1uTWuw45VzcAUyOC');
        
    //     var_dump($response);
        echo $data;

    }
     else {
        return false;
    }
}
