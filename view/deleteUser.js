module.exports.deleteUser = function(navBar, menuLink, uid) {
    return `
<!DOCTYPE html>
<html lang="ko">
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
                    <div class="col-12"><h3>사용자 삭제</h3></div>
                    <div class="col-12"><hr></div>
                    <div class="col-2"></div>
                    <div class="col-4">
                    <form action="/user/delete" class="form-horizontal" method="POST">
                        <input type="hidden" name="uid" value="${uid}"><br>
                        <p style="text-align: center;">${uid} 사용자를 삭제하시겠습니까?</p><br>
                        <p style="text-align: center;"><input class="btn btn-primary" type="submit" value="확인">&nbsp;&nbsp;&nbsp;
                            <button class="btn btn-secondary" type="reset" onclick="location.href='/user/list'">취소</button></p>
                    </form>
                    </div>
                    <div class="col-6"></div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
    `;
}