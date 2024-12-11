<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { ContactFormData } from "../types";

  export let submitError: string = "";

  const dispatch = createEventDispatcher<{
    submit: ContactFormData;
  }>();

  let formData: ContactFormData = {
    name: "",
    surname: "",
    email: "",
    phone: "",
    message: "",
  };

  let errors: Partial<Record<keyof ContactFormData, string>> = {};

  function validateForm(): boolean {
    errors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }

    if (!formData.surname.trim()) {
      errors.surname = "Surname is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
      isValid = false;
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      errors.phone = "Please enter a valid phone number";
      isValid = false;
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required";
      isValid = false;
    }

    return isValid;
  }

  function handleSubmit() {
    if (validateForm()) {
      dispatch("submit", formData);
    }
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <div class="form-group">
    <label for="name">Name *</label>
    <input
      type="text"
      id="name"
      bind:value={formData.name}
      class:error={errors.name}
    />
    {#if errors.name}
      <span class="error-message">{errors.name}</span>
    {/if}
  </div>

  <div class="form-group">
    <label for="surname">Surname *</label>
    <input
      type="text"
      id="surname"
      bind:value={formData.surname}
      class:error={errors.surname}
    />
    {#if errors.surname}
      <span class="error-message">{errors.surname}</span>
    {/if}
  </div>

  <div class="form-group">
    <label for="email">Email *</label>
    <input
      type="email"
      id="email"
      bind:value={formData.email}
      class:error={errors.email}
    />
    {#if errors.email}
      <span class="error-message">{errors.email}</span>
    {/if}
  </div>

  <div class="form-group">
    <label for="phone">Phone *</label>
    <input
      type="tel"
      id="phone"
      bind:value={formData.phone}
      class:error={errors.phone}
    />
    {#if errors.phone}
      <span class="error-message">{errors.phone}</span>
    {/if}
  </div>

  <div class="form-group">
    <label for="message">Message *</label>
    <textarea
      id="message"
      bind:value={formData.message}
      rows="5"
      class:error={errors.message}
    ></textarea>
    {#if errors.message}
      <span class="error-message">{errors.message}</span>
    {/if}
  </div>

  {#if submitError}
    <div class="submit-error">
      {submitError}
    </div>
  {/if}

  <button type="submit">Send Message</button>
</form>

<style>
  form {
    max-width: 600px;
    margin: 0 auto;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
  }

  input,
  textarea {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
  }

  input.error,
  textarea.error {
    border-color: #dc2626;
  }

  .error-message {
    color: #dc2626;
    font-size: 0.875rem;
    margin-top: 0.25rem;
    display: block;
  }

  .submit-error {
    color: #dc2626;
    margin-bottom: 1rem;
    text-align: center;
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
