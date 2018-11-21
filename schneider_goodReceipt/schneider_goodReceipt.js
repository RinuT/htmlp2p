'use strict';

angular.module('myApp.schneider_goodReceipt', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/schneider_goodReceipt', {
    templateUrl: 'schneider_goodReceipt/schneider_goodReceipt.html',
    controller:'schneider_goodReceiptCtrl'
  });
}])

.controller('schneider_goodReceiptCtrl', ['$scope','$http','$timeout',function ($scope,$http,$timeout) {
  $scope.BatchId=""
  $scope.PONumber=""
  $scope.LineNo=" "
  $scope.price=" "
  $scope.SEmaterialCode=" "
  $scope.POQty=" "
  $scope.UOP=" "
  $scope.totalRecieved=" "
  $scope.POCreationDate=" "
  $scope.DeliveryDate=" "
  $scope.Batch={}
  $scope.Batch.shippedQuantity=" "
  $scope.Batch.batchCode=" "
  $scope.Batch.batchStatus=" "
  $scope.Batch.recievedQuantity=" "
  var z=0
  $scope.id=" "
  $scope.loading=false
  $scope.search=false
  $scope.batchFall=false
  $scope.failuer2=false
  $scope.fialuier=false
  $scope.sucess=false
  $scope.batchShipped=[]
  $scope.batch=[]
 
 
  $scope.navigate=function(url){
    window.location = url;

  }


     $scope.batch=[]
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
 


  $scope.submit=function(id){

      $scope.id=id
      $scope.loading=true
      $scope.search=true
 
   
     $http.get("http://ec2-18-223-205-154.us-east-2.compute.amazonaws.com:3000/api/PurchaseOrder/"+$scope.id)
     .then(function(response) {
        $scope.res = response.data;
        $scope.PONumber= $scope.res.poNumber
        $scope.LineNo= $scope.res.purchaseorder.lineNumber
        $scope.price= $scope.res.purchaseorder.price
        $scope.SEmaterialCode= $scope.res.purchaseorder.materialCode
        $scope.POQty= $scope.res.purchaseorder.orderQuantity
        $scope.totalRecieved= $scope.res.purchaseorder.receivedQuantity
        $scope.UOP= $scope.res.purchaseorder.uop
        $scope.POCreationDate= $scope.res.purchaseorder.creationDate
        $scope.DeliveryDate= $scope.res.purchaseorder.deliveryDate
        $scope.dateC = new Date($scope.POCreationDate); 
        $scope.dateD = new Date($scope.DeliveryDate);
        $scope.Currency= $scope.res.purchaseorder.currency
       for(var i=0;i< $scope.res.purchaseorder.batch.length;i++){
          $scope.Batch.batchCode= $scope.res.purchaseorder.batch[i].batchCode
          $scope.Batch.shippedQuantity= $scope.res.purchaseorder.batch[i].batch.shippedQuantity
          $scope.Batch.batchStatus= $scope.res.purchaseorder.batch[i].batch.batchStatus
          $scope.Batch.recievedQuantity= $scope.res.purchaseorder.batch[i].batch.recievedQuantity
          if($scope.Batch.batchStatus==="recieved")
           $scope.batch.push($scope.Batch)
           else
           $scope.batchShipped.push($scope.Batch)
           $scope.Batch={}
       }
       $scope.loading=false
       $scope.fialuier=false
         
     }, function errorCallback(response){
      console.log("POST-ing of data failed");
      $scope.loading=false
      $scope.fialuier=true
  });
   
     }
  
   $scope.proceed=function(data){
  if($scope.batch.length>0){
      for(var i=0;i<$scope.batch.length;i++){
        if($scope.batch[i].batchCode==data ){
          z++;
          $scope.batchFall=true
          break;
        }
      }if(z==0){
        $scope.id=data
        $scope.loading=true
        $scope.search=true
       // console.log(id)
        $scope.setProceed()
      }
    }
    else{
      $scope.id=data
        $scope.loading=true
        $scope.search=true
       // console.log(id)
        $scope.setProceed()
    }
     

  }
  $scope.setProceed=function() {
    var shipmentDate = new Date();
    shipmentDate=$scope.ShipmentDate
   var CreationDate = new Date();
   CreationDate=$scope.dateC
  
    var request=
              
                 {
            "$class": "com.cts.ipm.p2pNetwork.GoodsReceipt",
            "receiptId": $scope.receiptId,
            "goodreceipt": {
                "$class": "com.cts.ipm.p2pNetwork.receipt",
                "poNumber": $scope.PONumber,
                "lineNumber": "",
                "materialCode": $scope.SEmaterialCode,
                "quantity": "",
                "UOP": "",
                "receiptDate": shipmentDate.toString(),
                "receivedQuantity":  $scope.shipmentQuantity,
                "batchId": $scope.id,
                "invoiceStatus": ""
            },  "report": {
              "$class": "com.cts.ipm.p2pNetwork.newReport",
              "transactionType": "",
              "date": "",
              "quantity": "",
              "poNumber": "",
              "materialCode": ""
            }
            }
          
            
       var requestInfo = RequestProceed();
     
       data : requestInfo
   
     var res = $http.post('http://ec2-18-223-205-154.us-east-2.compute.amazonaws.com:3000/api/GoodsReceipt',request).then(function successCallback(response){
             $scope.update_response=response;
             $scope.transactionId=$scope.update_response.data.transactionId
             $scope.sucess=true
             $scope.loading=false
             $scope.failuer2=false
         }, function errorCallback(response){
          $scope.failuer2=true
          $scope.loading=false
          $scope.sucess=false
         });
 
    
   }
   

function RequestProceed() {
   
   return {
        
    "Request" :{
      "$class": "com.cts.ipm.p2pNetwork.GoodsReceipt",
      "receiptId": " ",
      "goodreceipt": {
        "$class": "com.cts.ipm.p2pNetwork.receipt",
        "poNumber": " ",
        "lineNumber": " ",
        "materialCode": " ",
        "quantity": " ",
        "UOP": " ",
        "receiptDate": " ",
        "receivedQuantity": " ",
        "batchId": " ",
        "invoiceStatus": " "
    },  "report": {
      "$class": "com.cts.ipm.p2pNetwork.newReport",
      "transactionType": "",
      "date": "",
      "quantity": "",
      "poNumber": "",
      "materialCode": ""
    }
    }
    
            
     }

   };
   }]);