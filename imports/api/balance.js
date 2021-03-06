import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
export const BalanceApi = new Mongo.Collection('balance');

Meteor.methods({
'balance.insert'(balance){
  BalanceApi.insert({
    shopid:balance.shopid,
    type:balance.type,
    balance:balance.balance,
    createdAt:new Date()
   });
},
'balance.check'(shopid){
  var today=new Date()
   var day= today.getDate();
   var month= today.getMonth();
   var year= today.getFullYear();
   let mybalance = BalanceApi.find({createdAt:{$gt:new Date(`${year}/${++month}/${day}`)},shopid}).fetch();
   return mybalance;
},
'balance.getlastnightclosingbalance'(shopid){
  var today=new Date()
   var day= today.getDate();
   var month= today.getMonth();
   var year= today.getFullYear();
   let mybalance = BalanceApi.find({createdAt:{$gt:new Date(`${year}/${month+1}/${day-2}`),$lt:new Date(`${year}/${month+1}/${day}`)},type:"0",shopid}).fetch();
   return mybalance;
},
'balance.remove'(balanceid){
  BalanceApi.remove(balanceid);
},
'balance.update'(balanceid,balance){
  return  BalanceApi.update({_id:balanceid},{$set:{balance}});
}
});
if (Meteor.isServer) {
  Meteor.publish('balance', function userPublication(){
    return  BalanceApi.find();
  });
}
