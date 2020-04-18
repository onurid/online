import 'dart:async';
import 'dart:convert';
import 'dart:io';

import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_chat_demo/chat.dart';
import 'package:flutter_chat_demo/const.dart';
import 'package:flutter_chat_demo/login.dart';
import 'package:flutter_chat_demo/settings.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:web_socket_channel/io.dart';

void main() => runApp(MyApp());

class DocumentSnapshot {
    Stream<dynamic> get Get  async* {
    Map<String, dynamic> regionData = 
    {
      'id': 0,
      'nickname': 'Aile içi sohbet',
      'aboutMe':'Aile içi güvenli sohbet platformu',
      'photoUrl':'https://pbs.twimg.com/profile_images/1239521174356459520/czPuWwV__400x400.jpg'
    };
    yield regionData;
  } 
}

class MainScreen extends StatefulWidget {
  final String currentUserId;

  MainScreen({Key key, @required this.currentUserId}) : super(key: key);

  @override
  State createState() => MainScreenState(currentUserId: currentUserId);
}

class MainScreenState extends State<MainScreen> {
  MainScreenState({Key key, @required this.currentUserId});

  final String currentUserId;
  final FlutterLocalNotificationsPlugin flutterLocalNotificationsPlugin = new FlutterLocalNotificationsPlugin();
  final Account kimlikSignIn = Account();

  bool isLoading = false;
  List<Choice> choices = const <Choice>[
    const Choice(title: 'Ayarlar', icon: Icons.settings),
    const Choice(title: 'Oturumdan Çıkış', icon: Icons.exit_to_app),
  ];

  @override
  void initState() {
    super.initState();
    registerNotification();
    configLocalNotification();
  }

  void registerNotification() {
    
  }

  void configLocalNotification() {
    var initializationSettingsAndroid = new AndroidInitializationSettings('app_icon');
    var initializationSettingsIOS = new IOSInitializationSettings();
    var initializationSettings = new InitializationSettings(initializationSettingsAndroid, initializationSettingsIOS);
    flutterLocalNotificationsPlugin.initialize(initializationSettings);
  }

  void onItemMenuPress(Choice choice) {
    if (choice.title == 'Çıkış') {
      handleSignOut();
    } else {
      Navigator.push(context, MaterialPageRoute(builder: (context) => Settings()));
    }
  }

  void showNotification(message) async {
    var androidPlatformChannelSpecifics = new AndroidNotificationDetails(
      Platform.isAndroid ? 'com.dfa.flutterchatdemo': 'com.duytq.flutterchatdemo',
      'Chat yasar',
      'your channel description',
      playSound: true,
      enableVibration: true,
      importance: Importance.Max,
      priority: Priority.High,
    );
    var iOSPlatformChannelSpecifics = new IOSNotificationDetails();
    var platformChannelSpecifics =
        new NotificationDetails(androidPlatformChannelSpecifics, iOSPlatformChannelSpecifics);
    await flutterLocalNotificationsPlugin.show(
        0, message['title'].toString(), message['body'].toString(), platformChannelSpecifics,
        payload: json.encode(message));
  }

  Future<bool> onBackPress() {
    openDialog();
    return Future.value(false);
  }

  Future<Null> openDialog() async {
    switch (await showDialog(
        context: context,
        builder: (BuildContext context) {
          return SimpleDialog(
            contentPadding: EdgeInsets.only(left: 0.0, right: 0.0, top: 0.0, bottom: 0.0),
            children: <Widget>[
              Container(
                color: themeColor,
                margin: EdgeInsets.all(0.0),
                padding: EdgeInsets.only(bottom: 10.0, top: 10.0),
                height: 100.0,
                child: Column(
                  children: <Widget>[
                    Container(
                      child: Icon(
                        Icons.exit_to_app,
                        size: 30.0,
                        color: Colors.white,
                      ),
                      margin: EdgeInsets.only(bottom: 10.0),
                    ),
                    Text(
                      'UYGULAMADAN ÇIKIŞ',
                      style: TextStyle(color: Colors.white, fontSize: 18.0, fontWeight: FontWeight.bold),
                    ),
                    Text(
                      'Uygulamadan çıkmak istediğine emin misin?',
                      style: TextStyle(color: Colors.white70, fontSize: 14.0),
                    ),
                  ],
                ),
              ),
              SimpleDialogOption(
                onPressed: () {
                  Navigator.pop(context, 0);
                },
                child: Row(
                  children: <Widget>[
                    Container(
                      child: Icon(
                        Icons.cancel,
                        color: primaryColor,
                      ),
                      margin: EdgeInsets.only(right: 10.0),
                    ),
                    Text(
                      'İPTAL',
                      style: TextStyle(color: primaryColor, fontWeight: FontWeight.bold),
                    )
                  ],
                ),
              ),
              SimpleDialogOption(
                onPressed: () {
                  Navigator.pop(context, 1);
                },
                child: Row(
                  children: <Widget>[
                    Container(
                      child: Icon(
                        Icons.check_circle,
                        color: primaryColor,
                      ),
                      margin: EdgeInsets.only(right: 10.0),
                    ),
                    Text(
                      'EVET',
                      style: TextStyle(color: primaryColor, fontWeight: FontWeight.bold),
                    )
                  ],
                ),
              ),
            ],
          );
        })) {
      case 0:
        break;
      case 1:
        exit(0);
        break;
    }
  }

  Future<Null> handleSignOut() async {
    this.setState(() {
      isLoading = true;
    });

    await kimlikSignIn.disconnect();
    await kimlikSignIn.signOut();

    this.setState(() {
      isLoading = false;
    });

    Navigator.of(context)
        .pushAndRemoveUntil(MaterialPageRoute(builder: (context) => MyApp()), (Route<dynamic> route) => false);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'CHAT LİSTESİ',
          style: TextStyle(color: primaryColor, fontWeight: FontWeight.bold),
        ),
        centerTitle: true,
        actions: <Widget>[
          PopupMenuButton<Choice>(
            onSelected: onItemMenuPress,
            itemBuilder: (BuildContext context) {
              return choices.map((Choice choice) {
                return PopupMenuItem<Choice>(
                    value: choice,
                    child: Row(
                      children: <Widget>[
                        Icon(
                          choice.icon,
                          color: primaryColor,
                        ),
                        Container(
                          width: 10.0,
                        ),
                        Text(
                          choice.title,
                          style: TextStyle(color: primaryColor),
                        ),
                      ],
                    ));
              }).toList();
            },
          ),
        ],
      ),
      body: WillPopScope(
        child: Stack(
          children: <Widget>[
            // List
            Container(
              child: StreamBuilder(
                stream:  new DocumentSnapshot().Get,
                builder: (context, snapshot) {
                  if (!snapshot.hasData) {
                    return Center(
                      child: CircularProgressIndicator(
                        valueColor: AlwaysStoppedAnimation<Color>(themeColor),
                      ),
                    );
                  } else {
                    return ListView.builder(
                      padding: EdgeInsets.all(10.0),
                      itemBuilder: (context, index) => buildItem(context, snapshot.data),//snapshot.data[index]),
                      itemCount: 1//snapshot.data.length,
                    );
                  }
                },
              ),
            ),

            // Loading
            Positioned(
              child: isLoading
                  ? Container(
                      child: Center(
                        child: CircularProgressIndicator(valueColor: AlwaysStoppedAnimation<Color>(themeColor)),
                      ),
                      color: Colors.white.withOpacity(0.8),
                    )
                  : Container(),
            )
          ],
        ),
        onWillPop: onBackPress,
      ),
    );
  }

  Widget buildItem(BuildContext context, Map<String, dynamic> document) {
    if (document['id'] == currentUserId) {
      return Container();
     } else {
       return Container(
         child: FlatButton(
           child: Row(
             children: <Widget>[
               Material(
                 child: document['photoUrl'] != null
                     ? CachedNetworkImage(
                         placeholder: (context, url) => Container(
                           child: CircularProgressIndicator(
                             strokeWidth: 1.0,
                             valueColor: AlwaysStoppedAnimation<Color>(themeColor),
                           ),
                           width: 50.0,
                           height: 50.0,
                           padding: EdgeInsets.all(15.0),
                         ),
                         imageUrl: document['photoUrl'],
                         width: 50.0,
                         height: 50.0,
                         fit: BoxFit.cover,
                       )
                     : Icon(
                         Icons.account_circle,
                         size: 50.0,
                         color: greyColor,
                       ),
                 borderRadius: BorderRadius.all(Radius.circular(25.0)),
                 clipBehavior: Clip.hardEdge,
               ),
               Flexible(
                 child: Container(
                   child: Column(
                     children: <Widget>[
                       Container(
                         child: Text(
                           'İsim: ${document['nickname']}',
                           style: TextStyle(color: primaryColor),
                         ),
                         alignment: Alignment.centerLeft,
                         margin: EdgeInsets.fromLTRB(10.0, 0.0, 0.0, 5.0),
                       ),
                       Container(
                         child: Text(
                           'Hakkında: ${document['aboutMe'] ?? 'Not available'}',
                           style: TextStyle(color: primaryColor),
                         ),
                         alignment: Alignment.centerLeft,
                         margin: EdgeInsets.fromLTRB(10.0, 0.0, 0.0, 0.0),
                       )
                     ],
                   ),
                   margin: EdgeInsets.only(left: 20.0),
                 ),
               ),
             ],
           ),
           onPressed: () {
             Navigator.push(
                 context,
                 MaterialPageRoute(
                     builder: (context) => Chat(
                           peerId: "7",//document["id"], // DocumentID
                           peerAvatar: document['photoUrl']                           
                         )));
           },
           color: greyColor2,
           padding: EdgeInsets.fromLTRB(25.0, 10.0, 25.0, 10.0),
           shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10.0)),
         ),
         margin: EdgeInsets.only(bottom: 10.0, left: 5.0, right: 5.0),
       );
     }
  }
}

class Choice {
  const Choice({this.title, this.icon});

  final String title;
  final IconData icon;
}
