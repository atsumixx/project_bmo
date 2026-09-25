$ErrorActionPreference = 'Stop'

$baseUrl = 'http://127.0.0.1:8000'
$server = Start-Process -FilePath 'php' -ArgumentList @('-S', '127.0.0.1:8000', '-t', (Join-Path $PSScriptRoot '..')) -PassThru -WindowStyle Hidden

try {
    $deadline = (Get-Date).AddSeconds(15)
    while ((Get-Date) -lt $deadline) {
        try {
            $null = Invoke-WebRequest -Uri $baseUrl -Method Get -TimeoutSec 2
            break
        }
        catch {
            Start-Sleep -Milliseconds 250
        }
    }

    $registerBody = '{"firstName":"Juan","lastName":"Dela Cruz","email":"juan@example.com","phone":"+639171234567","password":"StrongPass123!","role":"patron"}'
    $registerResponse = Invoke-RestMethod -Uri "$baseUrl/api/auth/register" -Method Post -ContentType 'application/json' -Body $registerBody
    if (-not $registerResponse.success) {
        throw 'Register endpoint did not respond successfully.'
    }

    $loginBody = '{"email":"juan@example.com","password":"StrongPass123!"}'
    $loginResponse = Invoke-RestMethod -Uri "$baseUrl/api/auth/login" -Method Post -ContentType 'application/json' -Body $loginBody
    if (-not $loginResponse.success) {
        throw 'Login endpoint did not respond successfully.'
    }

    Write-Output $registerResponse.message
    Write-Output $loginResponse.message
}
finally {
    if ($server -and -not $server.HasExited) {
        $server | Stop-Process -Force
    }
}
