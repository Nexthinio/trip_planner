package com.tripplanner.backend.controller;

import com.tripplanner.backend.model.File;
import com.tripplanner.backend.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@RestController
@RequestMapping("/files")
@CrossOrigin(origins = "http://localhost:3000")
public class FileController {

    @Autowired
    private FileService fileService;

//    @PostMapping("/upload")
//    public ResponseEntity<Long> uploadFile(@RequestParam("file") MultipartFile file) {
//        File saved = fileService.saveFile(file);
//        return ResponseEntity.ok(saved.getFileId());
//    }

    @GetMapping("/{id}")
    public ResponseEntity<byte[]> downloadFile(@PathVariable Long id) {
        Optional<File> file = fileService.getFile(id);

        if (file.isPresent()) {
            File f = file.get();
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(f.getType()))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + f.getName() + "\"")
                    .body(f.getData());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFile(@PathVariable Long id) {
        fileService.deleteFile(id);
        return ResponseEntity.noContent().build();
    }
}

