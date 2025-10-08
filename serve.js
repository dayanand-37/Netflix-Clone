const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 8000;

// MIME types
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    // Parse URL
    const parsedUrl = url.parse(req.url);
    let pathname = parsedUrl.pathname;
    
    // Default to index.html
    if (pathname === '/') {
        pathname = '/index.html';
    }
    
    // Get file path
    const filePath = path.join(__dirname, pathname);
    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    
    // Check if file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            // File not found
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(`
                <html>
                    <head><title>404 - Not Found</title></head>
                    <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #000; color: #fff;">
                        <h1>404 - Page Not Found</h1>
                        <p>The requested file was not found.</p>
                        <a href="/" style="color: #e50914;">Go Home</a>
                    </body>
                </html>
            `);
            return;
        }
        
        // Read and serve file
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end(`
                    <html>
                        <head><title>500 - Server Error</title></head>
                        <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #000; color: #fff;">
                            <h1>500 - Server Error</h1>
                            <p>An error occurred while reading the file.</p>
                            <a href="/" style="color: #e50914;">Go Home</a>
                        </body>
                    </html>
                `);
                return;
            }
            
            // Set headers
            res.writeHead(200, { 
                'Content-Type': contentType,
                'Cache-Control': 'no-cache'
            });
            res.end(data);
        });
    });
});

server.listen(PORT, () => {
    console.log('========================================');
    console.log('   Netflix Clone - Frontend Server');
    console.log('========================================');
    console.log();
    console.log(`🌐 Frontend running at: http://localhost:${PORT}`);
    console.log(`📱 Open this URL in your browser`);
    console.log();
    console.log('Press Ctrl+C to stop the server');
    console.log('========================================');
});

// Handle server errors
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log(`❌ Port ${PORT} is already in use. Please close other applications using this port.`);
    } else {
        console.log('❌ Server error:', err.message);
    }
    process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down frontend server...');
    server.close(() => {
        console.log('✅ Frontend server stopped.');
        process.exit(0);
    });
});
