# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability within FriendPay, please send an email to [satyajitsamal.dev@gmail.com]. All security vulnerabilities will be promptly addressed.

Please include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

## Security Measures

- Input validation using Zod
- CORS enabled with specific origins
- Environment variables for sensitive data
- MongoDB authentication
- Request rate limiting
- Data encryption in transit (HTTPS)