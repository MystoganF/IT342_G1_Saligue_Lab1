package com.example.mobile.utils

import android.content.Context

class SessionManager(context: Context) {

    private val prefs = context.getSharedPreferences("auth", Context.MODE_PRIVATE)

    companion object {
        private const val USER_TOKEN = "user_token"
        private const val USERNAME = "username"
    }

    fun saveSession(token: String, username: String) {
        prefs.edit()
            .putString(USER_TOKEN, token)
            .putString(USERNAME, username)
            .apply()
    }

    fun fetchToken(): String? = prefs.getString(USER_TOKEN, null)

    fun fetchUsername(): String? = prefs.getString(USERNAME, null)

    fun isLoggedIn(): Boolean = fetchToken() != null

    fun logout() {
        prefs.edit().clear().apply()
    }
}
