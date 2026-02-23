package com.example.mobile.data.remote.network

import android.content.Context
import android.content.Intent
import com.example.mobile.ui.login_module.login.LoginActivity
import com.example.mobile.utils.SessionManager
import okhttp3.Interceptor
import okhttp3.Response

class UnauthorizedInterceptor(private val context: Context) : Interceptor {

    override fun intercept(chain: Interceptor.Chain): Response {

        val request = chain.request()
        val response = chain.proceed(request)

        // Check if request had Authorization header
        val hasAuthHeader = request.header("Authorization") != null

        // Only logout if:
        // 1. Response is 401
        // 2. Request had Authorization header (meaning user was logged in)
        if (response.code == 401 && hasAuthHeader) {

            val session = SessionManager(context)
            session.logout()

            val intent = Intent(context, LoginActivity::class.java)
            intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
            context.startActivity(intent)
        }

        return response
    }
}