var connection = new autobahn.Connection({url: 'wss://ws.syrow.com:443/ws', realm: 'default'});

var app = angular.module('myApp', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/index.html');

    $stateProvider
        .state('state-1', {
            url: '/general',
            templateUrl: '/static/ngTemplates/general.html',
            controller: "myCtrl"
        });
});



app.controller("myCtrl", function ($scope) {
    $scope.channels = [
        {channelName:"general"},
        {channelName:"random"},
        {channelName:"slack-project-main"},
        {channelName:"new-text"}
    ];
    $scope.callme = function (a , $stateProvider) {
        if(a === "general"){
           console.log("GGGGGGGGGGGGGGG")
        }
        if(a === "random"){
            console.log("Random")
        }
        if(a === "slack-project-main"){
            console.log("slack-project-main")
        }
        if(a === "new-text"){
            console.log("new-text")
        }
    };
    $scope.dMsg = [
        "Prateek",
        "User",

    ];

    $scope.apps = [
        "Approval-Bot",
        "Asana",
        "Google Drive",
        "hello_World"
    ];

    $scope.mainChat = " ";
    $scope.channel = function () {
        $scope.mainChat = "#Channel";
    };
    $scope.dirMsg = function () {
        $scope.mainChat = "#Messages";
    };
    $scope.application = function () {
        $scope.mainChat = "#Applications";
    };
    $scope.user = function(){
        $scope.mainChat = "#Prateek"
    };
    $scope.user = function(){
        $scope.mainChat = "#Prudhvi"
    }


    // $scope.mglist = [];

    // $scope.invisible = false;

    // $scope.showMe = function () {
    //     $scope.invisible = true;
    //     if ($scope.myText != null) {
    //         $scope.todoList.push({

    //             todoName: $scope.myText,
    //             todoImage: "assets/img/img-2.jpg",
    //             time: "12:23 PM",
    //             mainName: "Prateek"
    //         });
    //         $scope.myText = null;

    //     }
    // };


    $scope.chAdd =[];

    $scope.addChannel = function(){
        $scope.invisible = true;
        if($scope.channelAdd !=null){
          $scope.chAdd.push({
              channelName: $scope.channelAdd
          });
          $scope.channelAdd =null;
        }
    }


    $scope.model = { message: "" };
    $scope.clickMe = function(outgoingMsg){
        $scope.mglist.push({
            message: outgoingMsg ,
            image2 : "assets/img/img-2.jpg",
            mainName1: "Prateek" ,
            mainName2 : "Prudhvi" ,
            image1 : "assets/img/img-1.jpg",
        });

        if (connection.session) {
           connection.session.publish("com.myapp.mytopic2", [outgoingMsg]);
           console.log("event published!");
           $scope.model.message= " " ;
        } else {
           console.log("cannot publish: no session");
        }
    };

    $scope.model = {message: " "};
    $scope.CurrentDate = new Date();

    $scope.mglist = [];
    $scope.showMe = function(incomingMsg) {
        $scope.mglist.push({
            message: incomingMsg ,
            image1 : "assets/img/img-2.jpg",
            mainName2: "Prateek" ,
            mainName1 : "Prudhvi" ,
            image2 : "assets/img/img-1.jpg",
        });
    };
});


// messaging app controller


// "onopen" handler will fire when WAMP session has been established ..
connection.onopen = function (session) {

   console.log("session established!");

   // our event handler we will subscribe on our topic
   //
   function onevent1(args, kwargs) {
      console.log("got event:", args, kwargs);
      var scope = angular.element(document.getElementById('Receiver')).scope();
      scope.$apply(function() {
          scope.showMe(args[0]);
      });
   }

   // subscribe to receive events on a topic ..
   //
   session.subscribe('com.myapp.mytopic2', onevent1).then(
      function (subscription) {
         console.log("ok, subscribed with ID " + subscription.id);
      },
      function (error) {
         console.log(error);
      }
   );
   function utcnow() {
           console.log("Someone is calling com.myapp.date");
           now = new Date();
           return now.toISOString();
       }
       session.register('com.myapp.date', utcnow).then(
           function (registration) {
               console.log("Procedure registered:", registration.id);
           },
           function (error) {
               console.log("Registration failed:", error);
               document.getElementById('online').style.visibility = "hidden";
           }
       );

};




// "onclose" handler will fire when connection was lost ..
connection.onclose = function (reason, details) {
   console.log("connection lost", reason);
}


// initiate opening of WAMP connection ..
connection.open();
