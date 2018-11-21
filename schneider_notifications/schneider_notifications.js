'use strict';

angular.module('myApp.schneider_notifications', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/schneider_notifications', {
    templateUrl: 'schneider_notifications/schneider_notifications.html',
    controller:'schneider_notificationsCtrl'
  });
  
}])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/schneider_notification_success', {
    templateUrl: 'schneider_notification_success/schneider_notfication_success.html',
    controller:'schneider_notificationsCtrl_success'
  });
  
}])

app.controller('schneider_notificationsCtrl', ['$scope','myservice','$http','$timeout',function ($scope,myservice,$http,$timeout){
  $scope.PODataUnpaid=[];
  $scope.poData={}
  $scope.poData.poNumber=""
  $scope.poData.diffDays=""
  $scope.poData.poStatus=""
  $scope.poData.batchId=""
  $scope.poData.materialCode=""
  $scope.val="1"
  $scope.search=false
  $scope.BatchId=""
  $scope.PONumber=""
  $scope.LineNo=" "
  $scope.price=" "
  $scope.SEmaterialCode=" "
  $scope.POQty=" "
  $scope.UOP=" "
  $scope.DeliveryDate=" "
 $scope.Currency=" "
 $scope.deliveryNoteNo=" "
 $scope.shippmentDate=" "
 $scope.shippedQty=" "
 $scope.invoiceId=""
 $scope.search=false
$scope.Pending=false
$scope.loading=true
 var acc = document.getElementsByClassName("accordion");
var i;
$scope.CreationDate = new Date();
for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}

  
  $scope.onload=function(){
    
    $http.get("http://ec2-18-223-205-154.us-east-2.compute.amazonaws.com:3000/api/newBatch")
    .then(function(response) {
      $scope.res=response.data
      var datetime = new Date();
      var date1 = new Date(datetime);
      for( var n=0;n<$scope.res.length;n++){
       
        var date2 = new Date($scope.res[n].batch.receiptDate)
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600* 24)); 
        if(diffDays>90 & $scope.res[n].batch.availableQuantity>0){
          $scope.poData['batch']=$scope.res[n].batchCode
          $scope.poData['poNumber']=$scope.res[n].batch.poNumber
          $scope.poData['materialCode']=$scope.res[n].batch.materialCode
          $scope.poData['quantity']=$scope.res[n].batch.availableQuantity
          $scope.poData['amount']=$scope.res[n].batch.amount
          $scope.PODataUnpaid.push($scope.poData)
          $scope.poData={}
          $scope.Pending=true
        
        }

       
      }
       if($scope.PODataUnpaid.length==0){
          $scope.noData=true
          
        }
        $scope.loading=false
        
    }, function(response) {
      $scope.content = "Something went wrong";
      $scope.loading=false
  });
  }
 $scope.generateInvoice = function(id,batch,mc,q){
  $scope.search=true
  myservice.po=id
  myservice.batch=mc
   myservice.mc=batch
   myservice.quantity=q
  
 }
 
 $scope.navigate=function(url){
  window.location = url;

}
 }]);
app.controller('schneider_notificationsCtrl_success', ['$scope','myservice','$http','$timeout',function ($scope,myservice,$http,$timeout) {
  $scope.notGenerated=[];
    $scope.inv="";
    $scope.PODataGenerated=[];
    $scope.PODataPaid=[];
    $scope.poData={}
    $scope.poData.invoiceNo=""
    $scope.poData.invoiceStatus=""
    $scope.poData.consumptionQuantity=""
    $scope.poData.diffDays=""
    $scope.poData.materialCode=""
    $scope.val="1"
  $scope.noData=false
    $scope.Search=false
    $scope.Search1=false
    $scope.fialuier3=false
    $scope.fialuier=false
    $scope.fialuier1=false
    $scope.BatchId=""
    $scope.PONumber=""
    $scope.LineNo=" "
    $scope.price=" "
    $scope.SEmaterialCode=" "
    $scope.POQty=" "
    $scope.UOP=" "
    $scope.DeliveryDate=" "
   $scope.Currency=" "
   $scope.deliveryNoteNo=" "
   $scope.shippmentDate=" "
   $scope.shippedQty=" "
  $scope.success=false
   $scope.Unpaid=false
   $scope.notGen=false
   $scope.paid=false
   $scope.display=true
   $scope.Pending=false
    $scope.PODataPending=[]
    $scope.loading=true
    $scope.id= myservice.xxx
    var acc = document.getElementsByClassName("accordion");
    var i;
    $scope.CreationDate = new Date();
    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight){
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        } 
      });
    }
    
  $scope.onload=function(){
    $scope.batchId=myservice.batch
    $scope.poNumber=myservice.po
    $scope.perUnitPrice
    $scope.materialCode=myservice.mc
    $scope.quantity= myservice.quantity
     $scope.loading=false
  }
   $scope.generate=function(){
      $scope.loading=true
    var requestInfo = Request();
    var request=
    {
      "$class": "com.cts.ipm.p2pNetwork.generateInvoice",
      "invDocNum": "1"+myservice.batch+"0",
      "selfinvoice": {
        "$class": "com.cts.ipm.p2pNetwork.SelfInvoice",
        "consumptionQuantity": "",
        "invoiceStatus": "",
        "amount": "",
        "materialCode": myservice.mc,
        "poNumber": myservice.po,
        "batch": {
          "$class": "com.cts.ipm.p2pNetwork.newBatch",
          "batchCode": myservice.batch,
          "batch": {
            "$class": "com.cts.ipm.p2pNetwork.batch",
            "shipmentDate": "",
            "receiptDate": "",
            "shippedQuantity": "",
            "recievedQuantity": "",
            "availableQuantity": "",
            "batchStatus": "",
            "poNumber": "",
            "materialCode": "",
            "invoice": []
          }
        },
        "invDocNum": "1"+myservice.batch+"0"
      },
      "batchCode": myservice.batch
    }
  var res = $http.post('http://ec2-18-223-205-154.us-east-2.compute.amazonaws.com:3000/api/generateInvoice',request).then(function successCallback(response){
               $scope.update_response=response;
               $scope.transactionId=$scope.update_response.data.transactionId
               $scope.loading=false
              $scope.success=true
               
           }, function errorCallback(response){
               console.log("POST-ing of data failed");
               $scope.loading=false
    $scope.fialuier3=false
           });
   }
    
    
       
       function Request() {
       
         return {
           "Request" :    {
            "$class": "com.cts.ipm.p2pNetwork.generateInvoice",
            "invDocNum": "",
            "selfinvoice": {
              "$class": "com.cts.ipm.p2pNetwork.SelfInvoice",
              "consumptionQuantity": "",
              "invoiceStatus": "",
              "amount": "",
              "materialCode": "",
              "poNumber": "",
              "batch": {
                "$class": "com.cts.ipm.p2pNetwork.newBatch",
                "batchCode": " ",
                "batch": {
                  "$class": "com.cts.ipm.p2pNetwork.batch",
                  "shipmentDate": "",
                  "receiptDate": "",
                  "shippedQuantity": "",
                  "recievedQuantity": "",
                  "availableQuantity": "",
                  "batchStatus": "",
                  "poNumber": "",
                  "materialCode": "",
                  "invoice": []
                }
              },
              "invDocNum": " "
            },
            "batchCode": ""
          }
           
         };  
         
    }

     $scope.navigate=function(url){
      window.location = url;
  
    }
    
     }]);
  
        
    app.service('myservice', function() {
      this.mc = "";
      this.po = "";
      this.batch=""
      this.quantity=""
    });
