package models

import (
	u "api/utils"
	"os"
	"strings"

	"github.com/dgrijalva/jwt-go"
	"github.com/jinzhu/gorm"
	"golang.org/x/crypto/bcrypt"
)

/*
JWT claims struct
*/
type Token struct {
	UserId uint
	jwt.StandardClaims
}

//a struct to rep user account
type Account struct {
	gorm.Model
	Email    string `json:"email"`
	Password string `json:"password"`
	Token    string `json:"token";sql:"-"`
	Nickname string `json:"nickname"`
	PhotoUrl string `json:"photoUrl"`
	AboutMe  string `json:"aboutMe"`
}

//Validate incoming user details...
func (account *Account) Validate() (map[string]interface{}, bool) {

	if !strings.Contains(account.Email, "@") {
		return u.Message(false, "Email address is required"), false
	}

	if len(account.Password) < 6 {
		return u.Message(false, "Password is required"), false
	}

	//Email must be unique
	temp := &Account{}

	//check for errors and duplicate emails
	err := GetDB().Table("accounts").Where("email = ?", account.Email).First(temp).Error
	if err != nil && err != gorm.ErrRecordNotFound {
		return u.Message(false, "Connection error. Please retry"), false
	}
	if temp.Email != "" {
		return u.Message(false, "Email address already in use by another user."), false
	}

	return u.Message(false, "Requirement passed"), true
}

func (account *Account) Create() map[string]interface{} {

	if resp, ok := account.Validate(); !ok {
		return resp
	}

	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(account.Password), bcrypt.DefaultCost)
	account.Password = string(hashedPassword)

	GetDB().Create(account)

	if account.ID <= 0 {
		return u.Message(false, "Failed to create account, connection error.")
	}

	//Create new JWT token for the newly registered account
	tk := &Token{UserId: account.ID}
	token := jwt.NewWithClaims(jwt.GetSigningMethod("HS256"), tk)
	tokenString, _ := token.SignedString([]byte(os.Getenv("token_password")))
	account.Token = tokenString

	account.Password = "" //delete password

	response := u.Message(true, "Account has been created")
	response["account"] = account
	return response
}

func Login(email, password string) map[string]interface{} {

	account := &Account{}
	err := GetDB().Table("accounts").Where("email = ?", email).First(account).Error
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return u.Message(false, "Email address not found")
		}
		return u.Message(false, "Connection error. Please retry")
	}

	err = bcrypt.CompareHashAndPassword([]byte(account.Password), []byte(password))
	if err != nil && err == bcrypt.ErrMismatchedHashAndPassword { //Password does not match!
		return u.Message(false, "Invalid login credentials. Please try again")
	}
	//Worked! Logged In
	account.Password = ""

	//Create JWT token
	tk := &Token{UserId: account.ID}
	token := jwt.NewWithClaims(jwt.GetSigningMethod("HS256"), tk)
	tokenString, _ := token.SignedString([]byte(os.Getenv("token_password")))
	account.Token = tokenString //Store the token in the response

	resp := u.Message(true, "Logged In")
	resp["account"] = account
	return resp
}

func GetUser(u uint) *Account {

	acc := &Account{}
	GetDB().Table("accounts").Where("id = ?", u).First(acc)
	if acc.Email == "" { //User not found!
		return nil
	}

	acc.Password = ""
	return acc
}

func GetAccount(uid uint) map[string]interface{} {

	account := GetUser(uid)

	response := u.Message(true, "Account found it")
	response["account"] = account
	return response
}

func (account *Account) Update(user uint) map[string]interface{} {

	curAccount := GetUser(user)
	isModify := false
	if account.Password != "" {
		s := strings.Split(account.Password, "#change-password#")
		if len(s) != 2 {
			resp := u.Message(false, "Password error")
			return resp
		}
		if len(account.Password) < 6 {
			resp := u.Message(false, "Password is required")
			return resp
		}
		err := bcrypt.CompareHashAndPassword([]byte(account.Password), []byte(s[0]))
		if err != nil && err == bcrypt.ErrMismatchedHashAndPassword { //Password does not match!
			return u.Message(false, "Current Password is not valid")
		}

		hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(s[1]), bcrypt.DefaultCost)
		curAccount.Password = string(hashedPassword)
		isModify = true
	}

	if account.Nickname != "" {
		curAccount.Nickname = account.Nickname
		isModify = true
	}
	if account.PhotoUrl != "" {
		curAccount.PhotoUrl = account.PhotoUrl
		isModify = true
	}
	if account.AboutMe != "" {
		curAccount.AboutMe = account.AboutMe
		isModify = true
	}

	if isModify {
		GetDB().Save(curAccount)
	} else {
		return u.Message(false, "Failed to modify account, can't update values.")
	}

	//Create new JWT token for the newly registered account
	tk := &Token{UserId: curAccount.ID}
	token := jwt.NewWithClaims(jwt.GetSigningMethod("HS256"), tk)
	tokenString, _ := token.SignedString([]byte(os.Getenv("token_password")))
	curAccount.Token = tokenString

	curAccount.Password = "" //delete password

	response := u.Message(true, "Account has been modified")
	response["account"] = curAccount
	return response
}
