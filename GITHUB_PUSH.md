# GitHub Push İşlemi

Bu dosya, projeyi GitHub'a push etme işlemi için talimatları içerir.

## Push İşlemi Adımları

### 1. Değişiklikleri Kontrol Et
```bash
git status
```

### 2. Tüm Değişiklikleri Ekle
```bash
git add .
```

### 3. Commit Yap
```bash
git commit -m "Açıklayıcı commit mesajı"
```

**Commit mesajı örnekleri:**
- `"Release notes 1.23 eklendi"`
- `"Video boyutları düzeltildi"`
- `"Yeni özellik eklendi: X"`
- `"Bug fix: Y sorunu çözüldü"`

### 4. GitHub'a Push Et
```bash
git push origin main
```

## Önemli Notlar

- **Her push otomatik deploy tetikler:** GitHub'a push yaptıktan sonra Netlify otomatik olarak deploy başlatır
- **Build süresi:** Genellikle 2-5 dakika sürer
- **Deploy durumu:** Netlify Dashboard → Deploys'tan kontrol edilebilir
- **Hata durumu:** Build loglarından hata mesajları görülebilir

## Hızlı Push (Tek Komut)

Tüm değişiklikleri tek seferde push etmek için:
```bash
git add . && git commit -m "Güncelleme" && git push origin main
```

## Güvenlik

- **Asla şunları commit etme:**
  - `.env` dosyaları
  - API key'ler
  - Şifreler
  - `node_modules` klasörü
  - `.git` klasörü

- **`.gitignore` dosyası** bu dosyaları otomatik olarak hariç tutar

## Sorun Giderme

### Push başarısız olursa:
```bash
# Son commit'i geri al
git reset HEAD~1

# Veya force push (dikkatli kullan!)
git push origin main --force
```

### Değişiklikleri görmek için:
```bash
git diff
```

### Commit geçmişini görmek için:
```bash
git log --oneline
```
