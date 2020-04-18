import 'dart:async';
import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_chat_demo/const.dart';
import 'package:flutter_chat_demo/main.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;
import 'package:web_socket_channel/io.dart';
import 'package:web_socket_channel/web_socket_channel.dart';

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'ileti online',
      theme: ThemeData(
        primaryColor: themeColor,
      ),
      home: LoginScreen(title: 'ILETI ONLINE'),
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

class UserAccount {
  final int id;
  final String createdAt;
  final String updatedAt;
  final String deletedAt;
  final String email;
  final String password;
  final String token;

  UserAccount({
    this.id, 
    this.createdAt,
    this.updatedAt,
    this.deletedAt,
    this.email,
    this.password,
    this.token
    });

  factory UserAccount.fromJson(Map<String, dynamic> json) {
    return UserAccount(
      id: json['ID'],
      createdAt: json['CreatedAt'],
      updatedAt: json['UpdatedAt'],
      deletedAt: json['DeletedAt'],
      email: json['email'],
      password: json['password'],
      token: json['token']
    );
  }
}

class User {
  final String message;
  final bool status;
  final UserAccount account;

  User({this.message, this.status, this.account});

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      message: json['message'],
      status: json['status'],
      account: UserAccount.fromJson(json['account'])
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
  final Account kimlikSignIn = Account();

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

    isLoggedIn = await kimlikSignIn.isSignedIn();
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

var email = emailController.text.trim() + '@ileti.online';
var gh = {
      'email': email,
      'password': passwordController.text.trim()
    };
var postData = json.encode(gh);

    final response = await http.post('http://192.168.2.10/api/user/login', headers: {
        HttpHeaders.contentTypeHeader: 'application/json'
      },body: postData);

    
  if (response.statusCode == 200) {
    // If the server did return a 200 OK response,
    // then parse the JSON.
    var user = User.fromJson(json.decode(response.body));

    if (user.status) {
        // Write data to local
        var currentUser = { 'id': user.account.id };
        await prefs.setString('id', user.account.id.toString());
        await prefs.setString('nickname', user.account.email);
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
          text: 'lemoras',
          children: [
            TextSpan(
              text: 'le',
              style: TextStyle(color: Color(0xffe46b10), fontSize: 30),
            ),
            TextSpan(
              text: 'mora',
              style: TextStyle(color: Colors.black, fontSize: 30),
            ),
            TextSpan(
              text: 's',
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
