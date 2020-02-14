module.exports.home = function(navBar, menuLink) {
    let temp = 20;
    let humid = 30;
    let cds = 98;
    let dist = 10.5;
    let sTime = "2020-02-14 09:50:23";
    let sUid = 'admin';
    let red = 100;
    let green = 120;
    let blue = 200;
    let relay = 1;
    let aTime = "2020-02-14 09:51:23";
    let aUid = 'admin';
    return `
<html>
<head>
    <title>강남 스마트팜</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"
        integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
</head>
<body> 
<div class="container">
    ${navBar}
    <div class="row" style="margin-top: 30px">
        <div class="col-2">
            ${menuLink}
        </div>
        <div class="col-10">
            <div class="row" style="margin-left: 10px">
            <div class="col-12"><h3>스마트팜 상태</h3></div>
            <div class="col-12"><hr></div>
            <div class="col-11">
                <h4>센서</h4>
                <table class="table table-condensed table-hover">
                    <thead class="thead-light">
                    <tr class="active">
                        <th>항목</th><th>범위</th>
                        <th style="text-align: center;">값</th>
                        <th>측정자</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><i class="fas fa-thermometer-half"></i>&nbsp;&nbsp;온도</td>
                        <td>0 ~ 40℃</td>
                        <td style="text-align: center;">
                            <div class="progress" style="height: 25px; width: 400px">
                                <div class="progress-bar bg-warning" role="progressbar" style="width: ${temp/40*100}%" aria-valuemin="0" aria-valuemax="40">${temp}</div>
                            </div></td>
                        <td>${sUid}</td>
                    </tr>
                    <tr>
                        <td><i class="fas fa-tint"></i>&nbsp;&nbsp;습도</td>
                        <td>0 ~ 60%</td>
                        <td style="text-align: center;">
                            <div class="progress" style="height: 25px; width: 400px">
                                <div class="progress-bar bg-info" role="progressbar" style="width: ${humid/60*100}%" aria-valuemin="0" aria-valuemax="60">${humid}</div>
                            </div></td>
                        <td>${sUid}</td>
                    </tr>
                    <tr>
                        <td><i class="far fa-lightbulb"></i>&nbsp;&nbsp;조도</td>
                        <td>0 ~ 100</td>
                        <td style="text-align: center;">
                            <div class="progress" style="height: 25px; width: 400px">
                                <div class="progress-bar bg-danger" role="progressbar" style="width: ${cds/100*100}%" aria-valuemin="0" aria-valuemax="100">${cds}</div>
                            </div></td>
                        <td>${sUid}</td>
                    </tr>
                    <tr>
                        <td><i class="fas fa-ruler-vertical"></i>&nbsp;&nbsp;거리</td>
                        <td>0 ~ 50cm</td>
                        <td style="text-align: center;">
                            <div class="progress" style="height: 25px; width: 400px">
                                <div class="progress-bar bg-dark" role="progressbar" style="width: ${dist/50*100}%" aria-valuemin="0" aria-valuemax="100">${dist}</div>
                            </div></td>
                        <td>${sUid}</td>
                    </tr>
                    </tbody>
                </table>
                <p style="text-align: right;">최종 측정시각: ${sTime}</p>
            </div>
            <div class="col-1"></div><br>
                <div class="col-11">
                    <h4>액츄에이터</h4>
                    <table class="table table-condensed table-hover">
                        <thead class="thead-light">
                        <tr class="active">
                            <th scope="col">항목</th><th>범위</th>
                            <th scope="col" style="text-align: center;">값</th>
                            <th scope="col">조작자</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>적색 LED</td><td>0 ~ 255</td>
                            <td style="text-align: center;">
                                <div class="progress" style="height: 25px; width: 400px">
                                    <div class="progress-bar bg-danger" role="progressbar" style="width: ${red/255*100}%" aria-valuemin="0" aria-valuemax="255">${red}</div>
                                </div></td>
                            <td>${aUid}</td>
                        </tr>
                        <tr>
                            <td>녹색 LED</td><td>0 ~ 255</td>
                            <td style="text-align: center;">
                                <div class="progress" style="height: 25px; width: 400px">
                                    <div class="progress-bar bg-success" role="progressbar" style="width: ${green/255*100}%" aria-valuemin="0" aria-valuemax="255">${green}</div>
                                </div></td>
                            <td>${aUid}</td>
                        </tr>
                        <tr>
                            <td>청색 LED</td><td>0 ~ 255</td>
                            <td style="text-align: center;">
                                <div class="progress" style="height: 25px; width: 400px">
                                    <div class="progress-bar bg-primary" role="progressbar" style="width: ${blue/255*100}%" aria-valuemin="0" aria-valuemax="255">${blue}</div>
                                </div></td>
                            <td>${aUid}</td>
                        </tr>
                        <tr>
                            <td>릴레이</td><td>0 ~ 1</td>
                            <td style="text-align: center;">
                                <div class="progress" style="height: 25px; width: 400px">
                                    <div class="progress-bar bg-secondary" role="progressbar" style="width: ${relay*100}%" aria-valuemin="0" aria-valuemax="1">${relay}</div>
                                </div></td>
                            <td>${aUid}</td>
                        </tr>
                        </tbody>
                    </table>
                    <p style="text-align: right;">최종 조작시각: ${aTime}</p>
                </div>
                <div class="col-1"></div><br>
                </div>
        </div>
    </div>
</div>
</body>
</html>
    `;
}