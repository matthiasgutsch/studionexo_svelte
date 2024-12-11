<script lang="ts">
  import MetaTags from "../../components/MetaTags.svelte";
  import { getCanonicalUrl } from "../../utils/url";
  import type { ContactFormData } from "../../types";

  let formData: ContactFormData = {
    name: "",
    surname: "",
    email: "",
    phone: "",
    message: "",
  };

  let submitError = "";
  let formSubmitted = false;

  async function handleSubmit() {
    try {
      const { grecaptcha } = window as any;
      if (!grecaptcha) {
        throw new Error("reCAPTCHA not loaded");
      }

      const recaptchaResponse = grecaptcha.getResponse();
      if (!recaptchaResponse) {
        throw new Error("Please complete the reCAPTCHA");
      }

      const response = await fetch("https://api.studionexo.com/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken: recaptchaResponse,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const result = await response.json();

      if (result.success) {
        formSubmitted = true;
        submitError = "";
        grecaptcha.reset();
      } else {
        throw new Error(result.message || "Failed to submit form");
      }
    } catch (error) {
      submitError =
        error.message || "An error occurred while submitting the form";
    }
  }
</script>

<MetaTags
  title="Contact Us"
  description="Get in touch with us. We'd love to hear from you!"
  canonical={getCanonicalUrl("/contact")}
/>

<div class="contact-page">
  <h1>Contact Us</h1>

  {#if formSubmitted}
    <div class="success-message">
      <h2>Thank you for contacting us!</h2>
      <p>We'll get back to you as soon as possible.</p>
    </div>
  {:else}
    <form on:submit|preventDefault={handleSubmit}>
      <div class="form-group">
        <label for="name">Name *</label>
        <input type="text" id="name" bind:value={formData.name} required />
      </div>

      <div class="form-group">
        <label for="surname">Surname *</label>
        <input
          type="text"
          id="surname"
          bind:value={formData.surname}
          required
        />
      </div>

      <div class="form-group">
        <label for="email">Email *</label>
        <input type="email" id="email" bind:value={formData.email} required />
      </div>

      <div class="form-group">
        <label for="phone">Phone *</label>
        <input type="tel" id="phone" bind:value={formData.phone} required />
      </div>

      <div class="form-group">
        <label for="message">Message *</label>
        <textarea id="message" bind:value={formData.message} rows="5" required
        ></textarea>
      </div>

      <div class="recaptcha-container">
        <div class="g-recaptcha" data-sitekey="YOUR_RECAPTCHA_SITE_KEY"></div>
      </div>

      {#if submitError}
        <div class="error-message">
          {submitError}
        </div>
      {/if}

      <button type="submit" class="btn btn-primary">Send Message</button>
    </form>
  {/if}
</div>

<style>
  .contact-page {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  h1 {
    text-align: center;
    margin-bottom: 2rem;
  }

  .recaptcha-container {
    margin: 1.5rem 0;
    display: flex;
    justify-content: center;
  }

  .error-message {
    color: #dc2626;
    margin-bottom: 1rem;
    text-align: center;
  }

  .success-message {
    text-align: center;
    padding: 2rem;
    background: #f0fdf4;
    border-radius: 0.5rem;
  }

  button {
    width: 100%;
    padding: 0.75rem;
    background: #2563eb;
    color: white;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
  }

  button:hover {
    background: #1d4ed8;
  }
</style>
