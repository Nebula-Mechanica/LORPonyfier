// ==UserScript==
// @name        LORPonyBlocker
// @namespace   lorponyblocker
// @description Скрипт, скрывающий аватарки поклонников My Little Pony на linux.org.ru
// @include     *linux.org.ru*
// @version     0.2.1
// ==/UserScript==

(function($){

 var bronylist=[
// 'a1batross',
 'Andrew',
// 'aidan',
 'Aleki',
 'Applejohn',
 'alright',
// 'Antimatter',
 'AptGet',
// 'Bagrov',
// 'brotheroftux',
// 'bookman900',
// 'BruteForce',
// 'bsdfun',
 'Cooler',
 'cryptohedge',
// 'Chaser_Andrey',
// 'Darth_Revan',
 'Dahnlka',
 'dearboy',
 'DoktorAkcel',
 'DeadEye',
// 'Deneb',
// 'derlafff',
// 'drBatty',
// 'druganddrop-2',
// 'essir',
// 'Extraterrestrial',
// 'evilmanul',
 'Falcon-peregrinus',
 'Fluttershy',
// 'fish_ka',
 'fornlr',
// 'funeralismatic',
// 'Ghostwolf',
// 'goingUp',
 'GordonGR',
 'HashDerpy',
 'HiddenComplexity',
 'hizel',
 'Hoodoo',
 'IceAlchemist',
// 'Igorrr',
 'Indaril_Shpritz',
// 'KillTheCat',
 'IPR',
// 'ishido',
 'LastExile',
 'Legioner',
 'Le_Raux',
 'melkor217',
// 'MiniRoboDancer',
 'MyLittlePony',
 'morse',
 'Newlifer',
// 'OldWiseCat',
 'procoder99',
// 'proud_anon',
 'Policeman',
// 'pony',
 'Plcmn' ,
 'reliktt',
 'red_eyed_peguin',
 'rikardoac',
 'Romaboy',
 'Sahas',
 'svr4',
// 'sailter',
// 'sci-fi',
 'Sunil',
 'sluggard',
 'SL_RU',
 'terradot',
// 'Ttt',
// 'user_id_68054',
 'vazgen05',
// 'SANSLAR',
// 'x0r',
 'xfilx',
// 'zuzzas',
 ];
 
 function readSetting(name) {
  return localStorage.getItem(name) == 'true';
 }
 
 function toggleSetting(name) {
  var result = readSetting(name);
  result = !result;
  localStorage.setItem(name, result ? 'true' : 'false');
  return result;
 }
 
 function displaySetting(name, defaultChecked) {
  var result = readSetting(name);
  result = (result && !defaultChecked) || (!result && defaultChecked);
  return result;
 }

 var settingsTab={
  'fill_ponies': 'Заменять аватарки не-брони поняшами',
  'hide_ponies': 'Скрывать аватарки брони'
 };
 
 var poniAvs=[
  [
   'applejack',
   80
  ],
  [
   'fluttershy',
   72
  ],
  [
   'pinkie_pie',
   127
  ],
  [
   'rainbow_dash',
   176
  ],
  [
   'rarity',
   117
  ],
  [
   'twilight_sparkle',
   117
  ]
 ];
 
 function pad3(number) {
  var s='';
  s+=number/100|0;
  s+=(number/10)%10|0;
  s+=number%10;
  return s;
 }
 
 function randPony(){
  var name=poniAvs[(Math.random()*6)|0];
  var up=name[0].indexOf('_'),s_name;
  if (up>-1){
   s_name=name[0].substring(0,up)+name[0].substring(up+1);
  } else {
   s_name=name[0];
  }
  return 'http://www.bronyland.com/goodies/avatars/'+s_name+'/100/'+name[0]+'_avatar_'+pad3((Math.random()*name[1])|0+1)+'.png';
 }
 
 if (/settings/.test(window.location.href)){
  var baseHr=(($('#profileForm hr:eq(0)').parent()).parent())
  baseHr.after(
   $('<tr><td colspan=2><hr/></td></tr>')
  );
  for (settings in settingsTab){
   (function(s,st){
    baseHr.after(
     $('<tr/>')
      .append(
       $('<td/>').text(st[s])
      )
      .append(
       $('<td/>').append(
        $('<input/>')
        .attr('type','checkbox')
        .click(function(){
         toggleSetting(s)
        })
        .prop('checked',displaySetting(s))
       )
      )
    )
   })(settings,settingsTab);
  }
 };

 var ponycache=localStorage.getItem('ponycache');
 ponycache=ponycache?JSON.parse(ponycache):{};
  
 var checkNick=function(){
  var nick=$(this).text();
  for (var i=0;i<bronylist.length;i++){
   if (nick==bronylist[i]){
    if (readSetting('hide_ponies')){
     (($(this).closest('.msg-container')).find('.userpic')).hide();
    }
    return;
   }
  }
  if (readSetting('fill_ponies')){
   for (pony in ponycache){
    if (pony==nick) {
     var av=ponycache[pony];
     break;
    }
   }
   if (av==undefined){
    var av=randPony();
    ponycache[nick]=av;
   }
   (($(this).closest('.msg-container')).find('.userpic img')).attr('src',av).width(100).height(100);
  }
 };
 $('article.msg a[itemprop=\'creator\']').each(checkNick);
 localStorage.setItem('ponycache',JSON.stringify(ponycache));
//})(unsafeWindow?unsafeWindow.jQuery:jQuery);
})(jQuery);
