package com.example.mobile.utils

import android.content.Context

class SessionManager(context: Context) {

    private val prefs = context.getSharedPreferences("auth", Context.MODE_PRIVATE)

    companion object {
        private const val USER_TOKEN = "user_token"
    }

    fun saveToken(token: String) {
        prefs.edit().putString(USER_TOKEN, token).apply()
    }

    fun fetchToken(): String? {
        return prefs.getString(USER_TOKEN, null)
    }

    fun isLoggedIn(): Boolean {
        return fetchToken() != null
    }

    fun clear() {
        prefs.edit().clear().apply()
    }

    
}
