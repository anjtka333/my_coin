var angularModule = angular.module('popUps', []);
angularModule.controller('popupsController', function ($http) {
    var pop = this;
    $http.get("https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11").then(function (response) {
        pop.USDtoUAH = response.data[0].buy;
        pop.EURtoUAH = response.data[1].buy;
        return (pop.EURtoUAH);
    });
    pop.circles = [
        {
            savingsName: 'bla'
            , savingsAmmount: 555
            , currency: "UAH"
            , img: "../../img/popup-img/bar.png"
        }
    ];
    pop.balance = 0;
    pop.circlesSpend = [
        {
            spendName: 'girl'
            , img: "../../img/popup-img/bar.png"
        }
    ];
    pop.addSpendCircle = function () {
        $('#myModal3').modal('hide');
        pop.circlesSpend.push({
            spendName: pop.spendName
            , img: pop.img_icon
        });
        pop.spendName = '';
        pop.img = "../../img/popup-img/bar.png";
        pop.submitted = false;
    };
    pop.addCircle = function () {
        $('#myModal').modal('hide');
        console.log(pop.EURtoUAH);
        if (pop.savingsAmmount == undefined) {
            pop.savingsAmmount = 0;
        }
        if (pop.checked) {
            console.log(pop.data.selectedOption.name);
            if (pop.data.selectedOption.name == 'USD') {
                pop.balance += pop.savingsAmmount * pop.EURtoUAH;
            }
            else if (pop.data.selectedOption.name == 'UAH') {
                pop.balance += pop.savingsAmmount;
            }
            else {
                pop.balance += pop.savingsAmmount * pop.EURtoUAH;
            }
        }
        pop.circles.push({
            savingsName: pop.savingsName
            , savingsAmmount: pop.savingsAmmount
            , currency: pop.data.selectedOption.name
            , img: pop.img_icon
        });
        pop.savingsName = '';
        pop.savingsAmmount = 0;
        pop.currency = "UAH";
        pop.submitted = false;
    };
    pop.data = {
        availableOptions: [
            {
                id: '1',
                name: 'USD'
            }
            , {
                id: '2'
                , name: 'EUR'
            }
            , {
                id: '3'
                , name: 'UAH'
            }
        ]
        , selectedOption: {
            id: '3'
            , name: 'UAH'
        }
    };
    pop.resetDropDown = function () {
        pop.data = {
            availableOptions: [
                {
                    id: '1'
                    , name: 'USD'
                }
                , {
                    id: '2'
                    , name: 'EUR'
                }
                , {
                    id: '3'
                    , name: 'UAH'
                }
            ]
            , selectedOption: {
                id: '3'
                , name: 'UAH'
            }
        };
        pop.img_icon = "../../img/popup-img/bar.png";
        pop.submitted = false;
        pop.checked = false;
    }
    pop.setImg = function () {
        pop.img_icon = "../../img/popup-img/bar.png";
        pop.submitted = false;
    }
});
angular.module('popUps').directive('savingsPopup', function () {
    return {
        restrict: 'E',
        templateUrl: "savingsPopup.html",
    }
});
angular.module('popUps').directive('spendsPopup', function () {
    return {
        restrict: 'E',
        templateUrl: "spendsPopup.html",
    }
});
angular.module('popUps').directive('chooseIconPopup', function () {
    return {
        restrict: 'E',
        templateUrl: "chooseIconPopup.html",
    }
});
