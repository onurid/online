import 'dart:async';
import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_chat_demo/const.dart';
import 'package:flutter_chat_demo/main.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sohbet Yasar',
      theme: ThemeData(
        primaryColor: themeColor,
      ),
      home: LoginScreen(title: 'SOHBET YASAR'),
      debugShowCheckedModeBanner: false,
    );
  }
}

TextEditingController emailController = new TextEditingController();
TextEditingController passwordController = new TextEditingController();


class Account {
  int id;
  bool isAssigned;
  String title;

  //Account({this.id, this.title});

  // factory Account.fromJson(Map<String, dynamic> json) {
  //   return Account(
  //     id: json['id'],
  //     title: json['title'],
  //   );
   //}

   bool isSignedIn() {
     return false;
   }

   void disconnect() {
   }

   void signOut() {

   }
}

class User {
  final String message;
  final bool status;

  User({this.message, this.status});

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      message: json['message'],
      status: json['status'],
    );
  }
}

class LoginScreen extends StatefulWidget {
  LoginScreen({Key key, this.title}) : super(key: key);

  final String title;

  @override
  LoginScreenState createState() => LoginScreenState();
}

class LoginScreenState extends State<LoginScreen> {
  final Account googleSignIn = Account();

  SharedPreferences prefs;

  bool isLoading = false;
  bool isLoggedIn = false;
  User currentUser;

  @override
  void initState() {
    super.initState();
    isSignedIn();
  }

  void isSignedIn() async {
    this.setState(() {
      isLoading = true;
    });

    prefs = await SharedPreferences.getInstance();

    isLoggedIn = await googleSignIn.isSignedIn();
    if (isLoggedIn) {
      Navigator.push(
        context,
        MaterialPageRoute(builder: (context) => MainScreen(currentUserId: prefs.getString('id'))),
      );
    }

    this.setState(() {
      isLoading = false;
    });
  }

  Future<Null> handleSignIn() async {
    prefs = await SharedPreferences.getInstance();

    this.setState(() {
      isLoading = true;
    });

var gh = {
      'email': emailController.text.trim(),
      'password': passwordController.text.trim()
    };

var postData = json.encode(gh);

    final response = await http.post('http://kimlik.online/api/user/login', headers: {
        HttpHeaders.contentTypeHeader: 'application/json'
      },body: postData);

    
  if (response.statusCode == 200) {
    // If the server did return a 200 OK response,
    // then parse the JSON.
    var user = User.fromJson(json.decode(response.body));

    if (user.status) {
      
        // Write data to local
        var currentUser = { 'id': 1 };
        await prefs.setString('id', "1");
        await prefs.setString('nickname', "displayName");
        await prefs.setString('photoUrl', "photoUrl");
        await prefs.setString('aboutMe', "aboutMe");

      Fluttertoast.showToast(msg: "Oturum açma başarılı");
      this.setState(() {
        isLoading = false;
      });

      Navigator.push(context, MaterialPageRoute(builder: (context) => MainScreen(currentUserId: "1")));
    }
    else {
        Fluttertoast.showToast(msg: "Oturum açılamadı");
      this.setState(() {
        isLoading = false;
      });
      }
    } else {
      Fluttertoast.showToast(msg: "Oturum açılamadı");
      this.setState(() {
        isLoading = false;
      });
    }
  }

  Widget _entryField(String title, TextEditingController controller, {bool isPassword = false}) {
    return Container(
      margin: EdgeInsets.symmetric(vertical: 10),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Text(
            title,
            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15),
          ),
          SizedBox(
            height: 10,
          ),
          TextField(
            controller: controller,
              obscureText: isPassword,
              decoration: InputDecoration(
                  border: InputBorder.none,
                  fillColor: Color(0xfff3f3f4),
                  filled: true))
        ],
      ),
    );
  }

  Widget _title() {
    return RichText(
      textAlign: TextAlign.center,
      text: TextSpan(
          text: 'le',
          children: [
            TextSpan(
              text: 'mo',
              style: TextStyle(color: Colors.black, fontSize: 30),
            ),
            TextSpan(
              text: 'ras',
              style: TextStyle(color: Color(0xffe46b10), fontSize: 30),
            ),
          ]),
    );
  }

  @override
  Widget build(BuildContext context) {
   return Scaffold(
      body: SingleChildScrollView(
        child: Container(
            height: MediaQuery.of(context).size.height,
            child: Stack(
              children: <Widget>[
                Container(
                  padding: EdgeInsets.symmetric(horizontal: 20),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      Expanded(
                        flex: 3,
                        child: SizedBox(),
                      ),
                      _title(),
                      SizedBox(
                        height: 50,
                      ),
                      Column(
      children: <Widget>[
        _entryField("Telefon numarası", emailController),
        _entryField("Şifre", passwordController, isPassword: true),
      ],
    ),
                      SizedBox(
                        height: 20,
                      ),
                      Container(
      width: MediaQuery.of(context).size.width,
      padding: EdgeInsets.symmetric(vertical: 15),
      alignment: Alignment.center,
      decoration: BoxDecoration(
          borderRadius: BorderRadius.all(Radius.circular(5)),
          boxShadow: <BoxShadow>[
            BoxShadow(
                color: Colors.grey.shade200,
                offset: Offset(2, 4),
                blurRadius: 5,
                spreadRadius: 2)
          ],
          gradient: LinearGradient(
              begin: Alignment.centerLeft,
              end: Alignment.centerRight,
              colors: [Color(0xfffbb448), Color(0xfff7892b)])),
      child: FlatButton(
                  onPressed: handleSignIn,
                  child: Text(
                    'Giriş Yap',
                    style: TextStyle(fontSize: 20, color: Colors.white),
                  ),
              ),
      ),
    
                      
                      Expanded(
                        flex: 2,
                        child: SizedBox(),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          )
        )
      );
  }
}
