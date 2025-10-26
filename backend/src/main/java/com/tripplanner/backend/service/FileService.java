package com.tripplanner.backend.service;

import com.tripplanner.backend.model.File;
import com.tripplanner.backend.repository.FileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
public class FileService {

    @Autowired
    private FileRepository fileRepository;

//    public File saveFile(MultipartFile file) {
//        try {
//            File newFile = new File(
//                    file.getOriginalFilename(),
//                    file.getContentType(),
//                    file.getBytes()
//            );
//            return fileRepository.save(newFile);
//        } catch (IOException e) {
//            throw new RuntimeException("Błąd zapisu pliku: " + e.getMessage());
//        }
//    }

    public Optional<File> getFile(Long id) {
        return fileRepository.findById(id);
    }

    public void deleteFile(Long id) {
        fileRepository.deleteById(id);
    }
}
