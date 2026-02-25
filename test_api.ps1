$headers = @{
    "Content-Type" = "application/json"
}
$body = @{
    idea          = "Test Project"
    full_pipeline = $true
} | ConvertTo-Json

try {
    Write-Host "Sending Planner Request..."
    $response = Invoke-WebRequest -Uri "http://localhost:8000/agent/plan" -Method Post -Headers $headers -Body $body -TimeoutSec 120 -UseBasicParsing
    Write-Host "Status: $($response.StatusCode)"
    Write-Host "Content: $($response.Content)"
}
catch {
    Write-Host "Error: $($_.Exception.Message)"
    if ($_.Exception.Response) {
        Write-Host "Status: $($_.Exception.Response.StatusCode)"
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        Write-Host "Body: $($reader.ReadToEnd())"
    }
}
