package com.example.mobile.ui.landing_tenant_module.profile

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import com.example.mobile.R
import com.example.mobile.ui.login_module.login.LoginActivity
import com.google.android.material.appbar.MaterialToolbar

class ProfileActivity : AppCompatActivity() {

    private lateinit var editBtn: Button
    private lateinit var passwordBtn: Button
    private lateinit var passwordContainer: LinearLayout
    private lateinit var updatePasswordBtn: Button
    private lateinit var logoutBtn: Button
    private lateinit var topBar: MaterialToolbar

    private lateinit var username: EditText
    private lateinit var email: EditText
    private lateinit var phone: EditText

    private var isEditing = false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_profile)

        // ===== Views =====
        username = findViewById(R.id.usernameField)
        email = findViewById(R.id.emailField)
        phone = findViewById(R.id.phoneField)

        editBtn = findViewById(R.id.editProfileBtn)
        passwordBtn = findViewById(R.id.changePasswordBtn)
        passwordContainer = findViewById(R.id.passwordContainer)
        updatePasswordBtn = findViewById(R.id.updatePasswordBtn)
        logoutBtn = findViewById(R.id.logoutBtn)
        topBar = findViewById(R.id.topBar)

        setupBackButton()
        setupEditProfile()
        setupPassword()
        setupLogout()
    }

    // 🔙 BACK BUTTON
    private fun setupBackButton() {
        topBar.setNavigationOnClickListener {
            finish()
        }
    }

    // ✏️ EDIT PROFILE
    private fun setupEditProfile() {
        editBtn.setOnClickListener {
            isEditing = !isEditing
            setEditable(isEditing)

            if (!isEditing) {
                Toast.makeText(this, "Profile saved (mock)", Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun setEditable(enabled: Boolean) {
        username.isEnabled = enabled
        email.isEnabled = enabled
        phone.isEnabled = enabled

        editBtn.text = if (enabled) "Save Changes" else "Edit Profile"
    }

    // 🔒 PASSWORD SECTION
    private fun setupPassword() {
        passwordBtn.setOnClickListener {
            passwordContainer.visibility = View.VISIBLE
        }

        updatePasswordBtn.setOnClickListener {
            Toast.makeText(this, "Password updated (mock)", Toast.LENGTH_SHORT).show()
            passwordContainer.visibility = View.GONE
        }
    }

    // 🚪 LOGOUT
    private fun setupLogout() {
        logoutBtn.setOnClickListener {

            // TODO: later clear JWT token here

            Toast.makeText(this, "Logged out", Toast.LENGTH_SHORT).show()

            val intent = Intent(this, LoginActivity::class.java)
            intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
            startActivity(intent)
            finish()
        }
    }
}
