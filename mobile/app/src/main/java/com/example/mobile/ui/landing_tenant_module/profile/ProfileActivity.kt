package com.example.mobile.ui.landing_tenant_module.profile

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.*
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import com.example.mobile.R
import com.example.mobile.ui.login_module.login.LoginActivity
import com.example.mobile.utils.SessionManager
import com.google.android.material.appbar.MaterialToolbar
import com.google.android.material.dialog.MaterialAlertDialogBuilder

class ProfileActivity : AppCompatActivity() {

    private val viewModel: ProfileViewModel by viewModels()

    private lateinit var username: EditText
    private lateinit var email: EditText
    private lateinit var phone: EditText

    private lateinit var editBtn: Button
    private lateinit var passwordBtn: Button
    private lateinit var passwordContainer: LinearLayout
    private lateinit var updatePasswordBtn: Button
    private lateinit var logoutBtn: Button
    private lateinit var topBar: MaterialToolbar

    // ✔ MATCH XML IDS
    private lateinit var oldPassword: EditText
    private lateinit var newPassword: EditText
    private lateinit var confirmPassword: EditText

    private var isEditing = false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_profile)

        bindViews()
        observeViewModel()
        setupActions()

        viewModel.loadProfile()
    }

    private fun bindViews() {

        username = findViewById(R.id.usernameField)
        email = findViewById(R.id.emailField)
        phone = findViewById(R.id.phoneField)

        editBtn = findViewById(R.id.editProfileBtn)
        passwordBtn = findViewById(R.id.changePasswordBtn)
        passwordContainer = findViewById(R.id.passwordContainer)
        updatePasswordBtn = findViewById(R.id.updatePasswordBtn)
        logoutBtn = findViewById(R.id.logoutBtn)
        topBar = findViewById(R.id.topBar)

        // ✔ FIXED IDS
        oldPassword = findViewById(R.id.oldPassword)
        newPassword = findViewById(R.id.newPassword)
        confirmPassword = findViewById(R.id.confirmPassword)
    }

    /* ---------------- OBSERVE BACKEND ---------------- */

    private fun observeViewModel() {

        viewModel.profile.observe(this) { profile ->
            username.setText(profile["username"] ?: "")
            email.setText(profile["email"] ?: "")
            phone.setText(profile["phoneNumber"] ?: "")
        }

        viewModel.message.observe(this) {
            Toast.makeText(this, it, Toast.LENGTH_SHORT).show()
        }

        viewModel.loading.observe(this) {
            editBtn.isEnabled = !it
            updatePasswordBtn.isEnabled = !it
        }
    }

    /* ---------------- ACTIONS ---------------- */

    private fun setupActions() {

        topBar.setNavigationOnClickListener { finish() }

        editBtn.setOnClickListener {

            isEditing = !isEditing
            setEditable(isEditing)

            // SAVE PROFILE
            if (!isEditing) {
                viewModel.updateProfile(
                    username.text.toString(),
                    email.text.toString(),
                    phone.text.toString()
                )
            }
        }

        passwordBtn.setOnClickListener {
            passwordContainer.visibility = View.VISIBLE
        }

        updatePasswordBtn.setOnClickListener {

            val oldPass = oldPassword.text.toString()
            val newPass = newPassword.text.toString()
            val confirm = confirmPassword.text.toString()

            if (newPass != confirm) {
                Toast.makeText(this, "Passwords do not match", Toast.LENGTH_LONG).show()
                return@setOnClickListener
            }

            if (newPass.length < 6) {
                Toast.makeText(this, "Password must be at least 6 characters", Toast.LENGTH_LONG).show()
                return@setOnClickListener
            }

            viewModel.changePassword(oldPass, newPass)

            passwordContainer.visibility = View.GONE
            oldPassword.text.clear()
            newPassword.text.clear()
            confirmPassword.text.clear()
        }

        logoutBtn.setOnClickListener { showLogoutDialog() }
    }

    private fun setEditable(enabled: Boolean) {
        username.isEnabled = enabled
        email.isEnabled = enabled
        phone.isEnabled = enabled
        editBtn.text = if (enabled) "Save Changes" else "Edit Profile"
    }

    /* ---------------- LOGOUT ---------------- */

    private fun showLogoutDialog() {

        MaterialAlertDialogBuilder(this)
            .setTitle("Logout")
            .setMessage("Are you sure you want to logout?")
            .setNegativeButton("Cancel", null)
            .setPositiveButton("Logout") { _, _ ->

                SessionManager(this).logout()

                val intent = Intent(this, LoginActivity::class.java)
                intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
                startActivity(intent)
            }
            .show()
    }
}
