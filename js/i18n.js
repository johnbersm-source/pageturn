// Lingua dell'interfaccia: italiano, inglese, cinese semplificato, coreano.
// La chiave è il testo italiano, così il codice resta leggibile e una traduzione mancante
// mostra l'italiano invece di una chiave vuota. {nome} viene sostituito con i valori passati.
//   tr('Pagina {i} di {n}', { i: 3, n: 40 })
//   trp(3, 'pagina', 'pagine')   →  «3 pagine» / «3 pages» / «3 页»

export const LANGS = [['it', 'Italiano'], ['en', 'English'], ['zh', '中文'], ['ko', '한국어']];
const LOCALES = { it: 'it-IT', en: 'en-US', zh: 'zh-CN', ko: 'ko-KR' };
const KEY = 'pageturn-lang';

let pref = 'auto';
let lang = 'it';

// [inglese, cinese, coreano]; per i plurali, [[una, molte], [una, molte]] con {n} al posto del numero.
export const T = {
  // tempo e unità
  'mai': ['never', '从未', '없음'],
  'ora': ['just now', '刚刚', '방금'],
  '{n} min fa': ['{n} min ago', '{n} 分钟前', '{n}분 전'],
  '1 ora fa': ['1 hour ago', '1 小时前', '1시간 전'],
  '{n} ore fa': ['{n} hours ago', '{n} 小时前', '{n}시간 전'],
  'ieri': ['yesterday', '昨天', '어제'],
  'pagina|pagine': [['{n} page', '{n} pages'], ['{n} 页', '{n} 页'], ['{n}페이지', '{n}페이지']],
  'selezionata|selezionate': [['{n} selected', '{n} selected'], ['已选 {n} 页', '已选 {n} 页'], ['{n}개 선택됨', '{n}개 선택됨']],
  'pagina eliminata|pagine eliminate': [['{n} page deleted', '{n} pages deleted'], ['已删除 {n} 页', '已删除 {n} 页'], ['{n}페이지 삭제됨', '{n}페이지 삭제됨']],
  'foto importata|foto importate': [['{n} photo imported', '{n} photos imported'], ['已导入 {n} 张照片', '已导入 {n} 张照片'], ['사진 {n}장 가져옴', '사진 {n}장 가져옴']],
  'libro|libri': [['{n} book', '{n} books'], ['{n} 本书', '{n} 本书'], ['책 {n}권', '책 {n}권']],
  'libro selezionato|libri selezionati': [['{n} selected', '{n} selected'], ['已选 {n} 本', '已选 {n} 本'], ['{n}권 선택됨', '{n}권 선택됨']],

  // fogli e messaggi comuni
  'Chiudi': ['Close', '关闭', '닫기'],
  'Annulla': ['Cancel', '取消', '취소'],
  'Ok': ['OK', '好', '확인'],
  'Salva': ['Save', '保存', '저장'],
  'Elimina': ['Delete', '删除', '삭제'],
  'Applica': ['Apply', '应用', '적용'],
  'Fine': ['Done', '完成', '완료'],
  'Fatto': ['Done', '完成', '완료'],
  'Riprova': ['Try again', '重试', '다시 시도'],
  'Salva in File o Drive': ['Save to Files or Drive', '保存到“文件”或云盘', '파일 또는 드라이브에 저장'],
  'Scarica': ['Download', '下载', '다운로드'],
  'Importo {n} foto…': ['Importing photos ({n})…', '正在导入 {n} 张照片…', '사진 {n}장 가져오는 중…'],
  'Questo formato di immagine non è supportato': ['This image format isn’t supported', '不支持此图片格式', '지원하지 않는 이미지 형식입니다'],
  'Importo {i} di {n}…': ['Importing {i} of {n}…', '正在导入 {i} / {n}…', '{i} / {n} 가져오는 중…'],
  'Spazio esaurito': ['Out of space', '存储空间已满', '저장 공간 부족'],
  'Il telefono non ha più spazio per le scansioni. Esporta un backup o un PDF e libera spazio eliminando i libri già esportati.': ['Your phone has no room left for scans. Export a backup or a PDF, then free up space by deleting books you’ve already exported.', '手机已没有空间存放扫描。请导出备份或 PDF，再删除已导出的书以释放空间。', '휴대폰에 스캔을 저장할 공간이 없습니다. 백업이나 PDF를 내보낸 뒤, 이미 내보낸 책을 삭제해 공간을 확보하세요.'],
  'Salvataggio non riuscito. Riprova.': ['Couldn’t save. Try again.', '保存失败，请重试。', '저장하지 못했습니다. 다시 시도하세요.'],

  // home
  'Impostazioni': ['Settings', '设置', '설정'],
  'Aggiungi Pageturn alla schermata Home': ['Add Pageturn to your Home Screen', '将 Pageturn 添加到主屏幕', 'Pageturn을 홈 화면에 추가'],
  'Dal pulsante Condividi del browser (Safari, Opera, Chrome…) scegli «Aggiungi alla schermata Home».': ['Tap your browser’s Share button (Safari, Opera, Chrome…) and choose “Add to Home Screen”.', '在浏览器（Safari、Opera、Chrome…）的“分享”按钮中选择“添加到主屏幕”。', '브라우저(Safari, Opera, Chrome…)의 공유 버튼에서 “홈 화면에 추가”를 선택하세요.'],
  'Installa l’app dal menu del browser.': ['Install the app from your browser’s menu.', '请从浏览器菜单中安装此应用。', '브라우저 메뉴에서 앱을 설치하세요.'],
  'Così le scansioni non vengono cancellate dal browser.': ['That way the browser won’t delete your scans.', '这样浏览器就不会删除你的扫描。', '그러면 브라우저가 스캔을 삭제하지 않습니다.'],
  'Nascondi': ['Hide', '隐藏', '숨기기'],
  'Opzioni': ['Options', '选项', '옵션'],
  'Libri': ['Books', '书籍', '책'],
  'Inizia il tuo primo libro': ['Start your first book', '开始扫描第一本书', '첫 번째 책을 시작하세요'],
  'Ogni pagina viene salvata appena la scatti, anche se l’app si chiude.': ['Every page is saved the moment you take it, even if the app closes.', '每一页拍下后立即保存，即使应用关闭也不会丢失。', '촬영한 페이지는 즉시 저장되므로 앱이 종료되어도 사라지지 않습니다.'],
  'Nuovo libro': ['New book', '新书', '새 책'],
  'Crea e scansiona': ['Create and scan', '创建并扫描', '만들고 스캔하기'],
  'Libro del {d}': ['Book from {d}', '{d}的书', '{d}의 책'],
  'Rinomina': ['Rename', '重命名', '이름 변경'],
  'Esporta backup (.zip)': ['Export backup (.zip)', '导出备份 (.zip)', '백업 내보내기 (.zip)'],
  'Elimina libro': ['Delete book', '删除书籍', '책 삭제'],
  'Eliminare il libro?': ['Delete this book?', '删除这本书？', '이 책을 삭제할까요?'],
  '«{name}» e le sue {n} pagine verranno eliminati da questo dispositivo. Il backup sul server, se c’è, resta.': ['“{name}” and its {n} pages will be deleted from this device. The server backup, if there is one, stays.', '“{name}”及其 {n} 页将从此设备中删除。服务器上的备份（如有）会保留。', '“{name}”과(와) {n}페이지가 이 기기에서 삭제됩니다. 서버 백업이 있다면 그대로 유지됩니다.'],
  'Libro eliminato': ['Book deleted', '已删除书籍', '책을 삭제했습니다'],
  'Preparo il backup…': ['Preparing backup…', '正在准备备份…', '백업 준비 중…'],
  'Backup pronto': ['Backup ready', '备份已就绪', '백업 완료'],
  'Backup non riuscito: {e}': ['Backup failed: {e}', '备份失败：{e}', '백업 실패: {e}'],
  'Seleziona libri': ['Select books', '选择书籍', '책 선택'],
  'Tocca i libri nell’ordine in cui li vuoi nel file.': ['Tap the books in the order you want them in the file.', '按你希望它们在文件中出现的顺序点按书籍。', '파일에 넣을 순서대로 책을 누르세요.'],

  // libro
  'errore': ['error', '错误', '오류'],
  'sfocata': ['blurry', '模糊', '흐림'],
  'elaboro {n}': ['processing {n}', '正在处理 {n} 页', '{n}페이지 처리 중'],
  'tutto salvato': ['all saved', '已全部保存', '모두 저장됨'],
  'invio al server ({n})': ['sending to server ({n})', '正在上传到服务器 ({n})', '서버로 전송 중 ({n})'],
  'copia sul server': ['backed up on server', '已备份到服务器', '서버에 백업됨'],
  'server non raggiungibile': ['server unreachable', '无法连接服务器', '서버에 연결할 수 없음'],
  'Importa foto': ['Import photos', '导入照片', '사진 가져오기'],
  'Seleziona': ['Select', '选择', '선택'],
  'Altro': ['More', '更多', '더보기'],
  'Deseleziona': ['Deselect all', '全不选', '모두 해제'],
  'Seleziona tutte': ['Select all', '全选', '모두 선택'],
  'Esporta {pages}': ['Export {pages}', '导出 {pages}', '{pages} 내보내기'],
  'Seleziona pagine': ['Select pages', '选择页面', '페이지 선택'],
  'Riordina': ['Reorder', '排序', '순서 변경'],
  'Scansiona': ['Scan', '扫描', '스캔'],
  'Esporta': ['Export', '导出', '내보내기'],
  'Ruota': ['Rotate', '旋转', '회전'],
  'Filtro': ['Filter', '滤镜', '필터'],
  'Distendi': ['Unwarp', '展平', '펴기'],
  'Tieni premuta una pagina e trascinala nella nuova posizione': ['Press and hold a page, then drag it to its new position', '按住页面，拖到新位置', '페이지를 길게 누른 채 새 위치로 끌어다 놓으세요'],
  'Nessuna pagina': ['No pages yet', '还没有页面', '페이지가 없습니다'],
  'Tocca Scansiona per iniziare, oppure importa foto dal rullino.': ['Tap Scan to start, or import photos from your camera roll.', '点按“扫描”开始，或从相册导入照片。', '스캔을 눌러 시작하거나, 사진 보관함에서 사진을 가져오세요.'],
  'Riordina pagine': ['Reorder pages', '调整页面顺序', '페이지 순서 변경'],
  'Seleziona prima le pagine': ['Select some pages first', '请先选择页面', '먼저 페이지를 선택하세요'],
  'Eliminare {pages}?': ['Delete {pages}?', '删除 {pages}？', '{pages}을(를) 삭제할까요?'],
  'Le pagine verranno eliminate da questo dispositivo.': ['The pages will be deleted from this device.', '这些页面将从此设备中删除。', '페이지가 이 기기에서 삭제됩니다.'],
  'Pagine non più distese': ['Pages no longer unwarped', '已取消页面展平', '페이지 펴기를 해제했습니다'],
  'Distendo le pagine curve in background': ['Unwarping curved pages in the background', '正在后台展平弯曲的页面', '휘어진 페이지를 백그라운드에서 펴는 중'],
  'Filtro per le pagine selezionate': ['Filter for the selected pages', '所选页面的滤镜', '선택한 페이지의 필터'],
  'Originale': ['Original', '原图', '원본'],
  'Sbianca': ['Whiten', '增白', '밝게'],
  'Grigi': ['Grayscale', '灰度', '회색조'],
  'B/N': ['B/W', '黑白', '흑백'],
  '{n} pagine senza una copia fuori dal telefono': ['{n} pages with no copy outside your phone', '{n} 页还没有在手机之外备份', '휴대폰 밖에 사본이 없는 페이지 {n}장'],
  'Backup': ['Backup', '备份', '백업'],

  // fotocamera
  'Torcia': ['Flashlight', '手电筒', '손전등'],
  'Avvio la fotocamera…': ['Starting camera…', '正在启动相机…', '카메라 시작 중…'],
  'Rifai la pagina': ['Retake page', '重拍此页', '페이지 다시 촬영'],
  'Auto': ['Auto', '自动', '자동'],
  'Manuale': ['Manual', '手动', '수동'],
  'Doppia pagina': ['Double page', '双页', '두 쪽 펼침'],
  'Vai alle pagine': ['Go to pages', '查看页面', '페이지 보기'],
  'Scatta': ['Take photo', '拍摄', '촬영'],
  'Fotocamera di iOS': ['iOS Camera', 'iOS 相机', 'iOS 카메라'],
  'Gira pagina': ['Turn the page', '请翻页', '페이지를 넘기세요'],
  'Tocca il pulsante per scattare': ['Tap the button to take the photo', '点按按钮拍摄', '버튼을 눌러 촬영하세요'],
  'Inquadra una pagina': ['Frame a page', '请对准一页', '페이지를 화면에 맞추세요'],
  'Pagina rilevata · scatta quando vuoi': ['Page found · shoot when ready', '已识别页面 · 随时拍摄', '페이지 인식됨 · 원할 때 촬영'],
  'Tieni fermo': ['Hold still', '请保持不动', '움직이지 마세요'],
  'Pagina rilevata': ['Page found', '已识别页面', '페이지 인식됨'],
  'Pagina sostituita': ['Page replaced', '页面已替换', '페이지를 교체했습니다'],
  'Fotocamera non disponibile': ['Camera unavailable', '相机不可用', '카메라를 사용할 수 없습니다'],
  'La fotocamera funziona solo con un indirizzo https.': ['The camera only works on an https address.', '相机只能在 https 地址下使用。', '카메라는 https 주소에서만 작동합니다.'],
  'Controlla di aver concesso il permesso di usare la fotocamera.': ['Check that you’ve allowed camera access.', '请确认已允许使用相机。', '카메라 사용 권한을 허용했는지 확인하세요.'],
  'Usa la fotocamera di iOS': ['Use the iOS Camera', '使用 iOS 相机', 'iOS 카메라 사용'],
  'Doppia pagina: ogni scatto diventa due pagine': ['Double page: each shot becomes two pages', '双页：每次拍摄生成两页', '두 쪽 펼침: 한 번 촬영하면 두 페이지가 됩니다'],
  'Una pagina per scatto': ['One page per shot', '每次拍摄一页', '촬영당 한 페이지'],

  // vista libera
  'Pagina': ['Page', '页面', '페이지'],
  'Foto originale': ['Original photo', '原始照片', '원본 사진'],
  'Pizzica o doppio tocco per ingrandire, trascina per spostarti': ['Pinch or double-tap to zoom, drag to move around', '双指缩放或轻点两下放大，拖动以移动', '두 손가락으로 모으거나 두 번 눌러 확대하고, 끌어서 이동하세요'],
  'Immagine non disponibile: {e}': ['Image not available: {e}', '图片不可用：{e}', '이미지를 사용할 수 없습니다: {e}'],

  // editor
  'Pagine': ['Pages', '页面', '페이지'],
  'Pagina precedente': ['Previous page', '上一页', '이전 페이지'],
  'Pagina {i} di {n}': ['Page {i} of {n}', '第 {i} 页，共 {n} 页', '{n}페이지 중 {i}페이지'],
  'Pagina successiva': ['Next page', '下一页', '다음 페이지'],
  'Annulla modifica': ['Undo', '撤销', '실행 취소'],
  'Ripeti': ['Redo', '重做', '다시 실행'],
  'Schermo intero con zoom': ['Full screen with zoom', '全屏缩放查看', '전체 화면 확대 보기'],
  'Divisione annullata': ['Split undone', '已撤销拆分', '나누기를 취소했습니다'],
  'Le modifiche valgono per tutte le pagine': ['Edits apply to all pages', '修改将应用于所有页面', '수정 내용이 모든 페이지에 적용됩니다'],
  'Luminosità': ['Brightness', '亮度', '밝기'],
  'Contrasto': ['Contrast', '对比度', '대비'],
  'Nitidezza': ['Sharpness', '锐度', '선명도'],
  'Ritaglia': ['Crop', '裁剪', '자르기'],
  'Dividi': ['Split', '拆分', '나누기'],
  'Gomma': ['Eraser', '橡皮擦', '지우개'],
  'Rifai': ['Retake', '重拍', '다시 촬영'],
  'Trascina gli angoli, o il centro di un lato per spostarlo tutto': ['Drag a corner, or the middle of a side to move all of it', '拖动四角，或拖动边的中点移动整条边', '모서리를 끌거나, 변의 가운데를 끌어 변 전체를 옮기세요'],
  'Rileva': ['Detect', '自动检测', '자동 인식'],
  'Tutta la foto': ['Whole photo', '整张照片', '사진 전체'],
  'Bordi non trovati: sistemali a mano': ['Edges not found: adjust them by hand', '未找到边缘，请手动调整', '가장자리를 찾지 못했습니다. 직접 조정하세요'],
  'Passa il dito su macchie, segni e dita sul bordo': ['Swipe over stains, marks and fingers on the edge', '用手指涂抹污渍、笔迹和边缘的手指', '얼룩, 낙서, 가장자리의 손가락 위를 손가락으로 문지르세요'],
  'Pennello': ['Brush', '笔刷', '브러시'],
  'Annulla tratto': ['Undo stroke', '撤销笔画', '획 취소'],
  'Attendi l’anteprima aggiornata': ['Wait for the updated preview', '请等待预览更新', '미리보기가 갱신될 때까지 기다리세요'],
  'Scarico il modello per le pagine curve (31 MB), solo la prima volta': ['Downloading the curved-page model (31 MB), first time only', '正在下载弯曲页面模型（31 MB），仅首次需要', '휘어진 페이지 모델(31MB)을 내려받는 중 (처음 한 번만)'],
  'Pagina {i}': ['Page {i}', '第 {i} 页', '{i}페이지'],
  'Modifiche a tutte le pagine: attivo': ['Edits to all pages: on', '修改应用于所有页面：开', '모든 페이지에 수정 적용: 켜짐'],
  'Modifiche a tutte le pagine: disattivo': ['Edits to all pages: off', '修改应用于所有页面：关', '모든 페이지에 수정 적용: 꺼짐'],
  'Filtro, luminosità, contrasto, nitidezza e Distendi ora valgono per tutte le pagine': ['Filter, brightness, contrast, sharpness and Unwarp now apply to all pages', '滤镜、亮度、对比度、锐度和展平现在应用于所有页面', '필터, 밝기, 대비, 선명도, 펴기가 이제 모든 페이지에 적용됩니다'],
  'Le modifiche valgono solo per questa pagina': ['Edits apply to this page only', '修改仅应用于此页', '수정 내용이 이 페이지에만 적용됩니다'],
  'Nuova pagina dopo questa': ['New page after this one', '在此页后添加新页', '이 페이지 뒤에 새 페이지'],
  'Ripristina la foto originale': ['Restore the original photo', '恢复原始照片', '원본 사진으로 복원'],
  'Non è sfocata, togli l’avviso': ['It’s not blurry, remove the warning', '没有模糊，移除提示', '흐리지 않음, 경고 제거'],
  'Avviso rimosso': ['Warning removed', '已移除提示', '경고를 제거했습니다'],
  'Elimina pagina': ['Delete page', '删除页面', '페이지 삭제'],
  'Eliminare la pagina?': ['Delete this page?', '删除此页？', '이 페이지를 삭제할까요?'],
  'La pagina {i} verrà eliminata.': ['Page {i} will be deleted.', '第 {i} 页将被删除。', '{i}페이지가 삭제됩니다.'],
  'Attendi l’anteprima della pagina': ['Wait for the page preview', '请等待页面预览', '페이지 미리보기를 기다리세요'],
  'Sposta la linea sulla piega tra le due pagine. Trascina i cerchi per inclinarla': ['Move the line onto the fold between the two pages. Drag the circles to tilt it', '将线移到两页之间的折痕处。拖动圆点可使其倾斜', '선을 두 페이지 사이의 접힌 곳으로 옮기세요. 원을 끌어 기울일 수 있습니다'],
  'Pagina divisa in due': ['Page split in two', '页面已一分为二', '페이지를 둘로 나눴습니다'],

  // esportazione
  'Immagini': ['Images', '图片', '이미지'],
  'Ultimo backup': ['Last backup', '上次备份', '마지막 백업'],
  'Esporta progetto (.zip)': ['Export project (.zip)', '导出项目 (.zip)', '프로젝트 내보내기 (.zip)'],
  'Backup automatico': ['Automatic backup', '自动备份', '자동 백업'],
  'non attivo': ['off', '未开启', '꺼짐'],
  'in corso': ['in progress', '进行中', '진행 중'],
  'attivo': ['on', '已开启', '켜짐'],
  'Formato pagina': ['Page size', '页面尺寸', '페이지 크기'],
  'Come la foto': ['Same as photo', '与照片相同', '사진과 동일'],
  'A4 con margini': ['A4 with margins', 'A4 带边距', '여백 있는 A4'],
  'Ogni pagina viene centrata su un foglio A4 con 1 cm di margine: tutte della stessa misura, pronte da stampare.': ['Each page is centered on an A4 sheet with a 1 cm margin: all the same size, ready to print.', '每页居中放在 A4 纸上，边距 1 厘米：尺寸统一，可直接打印。', '각 페이지를 1cm 여백의 A4 용지 가운데에 배치합니다. 크기가 모두 같아 바로 인쇄할 수 있습니다.'],
  'Testo ricercabile (OCR)': ['Searchable text (OCR)', '可搜索文字 (OCR)', '검색 가능한 텍스트 (OCR)'],
  'Italiano': ['Italian', '意大利语', '이탈리아어'],
  'Inglese': ['English', '英语', '영어'],
  'Riconoscimento del testo': ['Text recognition', '文字识别', '텍스트 인식'],
  'Preciso': ['Accurate', '精确', '정밀'],
  'Veloce': ['Fast', '快速', '빠름'],
  'Più preciso su foto, pagine curve e caratteri piccoli. Riconosce italiano, inglese e le altre lingue con alfabeto latino. La prima volta scarica circa 27 MB.': ['More accurate on photos, curved pages and small print. Reads Italian, English and other Latin-script languages. Downloads about 27 MB the first time.', '对照片、弯曲页面和小字更准确。可识别意大利语、英语及其他拉丁字母语言，暂不支持中文。首次使用需下载约 27 MB。', '사진, 휘어진 페이지, 작은 글자에 더 정확합니다. 이탈리아어, 영어 등 라틴 문자 언어를 인식하며 한국어는 아직 인식하지 못합니다. 처음에 약 27MB를 내려받습니다.'],
  'Circa tre volte più veloce, meno preciso sulle foto difficili. La prima volta scarica circa 10 MB.': ['About three times faster, less accurate on difficult photos. Downloads about 10 MB the first time.', '速度约快三倍，但对较难的照片不够准确。首次使用需下载约 10 MB。', '약 3배 빠르지만 까다로운 사진에서는 덜 정확합니다. 처음에 약 10MB를 내려받습니다.'],
  'Tutto avviene sul telefono, poi funziona anche offline.': ['It all happens on your phone, and afterwards it works offline too.', '全部在手机上完成，之后离线也能使用。', '모든 처리는 휴대폰에서 이루어지며, 이후에는 오프라인에서도 작동합니다.'],
  'Qualità': ['Quality', '质量', '품질'],
  'Bassa': ['Low', '低', '낮음'],
  'Media': ['Medium', '中', '보통'],
  'Alta': ['High', '高', '높음'],
  'Stima in corso…': ['Estimating…', '正在估算…', '예상 크기 계산 중…'],
  'Crea PDF': ['Create PDF', '生成 PDF', 'PDF 만들기'],
  'Crea immagini (.zip)': ['Create images (.zip)', '生成图片 (.zip)', '이미지 만들기 (.zip)'],
  'circa {size}': ['about {size}', '约 {size}', '약 {size}'],
  'Scegli almeno una lingua': ['Choose at least one language', '请至少选择一种语言', '언어를 하나 이상 선택하세요'],
  'Creo il PDF': ['Creating PDF', '正在生成 PDF', 'PDF 만드는 중'],
  'Preparo le immagini': ['Preparing images', '正在准备图片', '이미지 준비 중'],
  'Preparazione…': ['Preparing…', '准备中…', '준비 중…'],
  'Tieni l’app aperta. Le pagine restano salvate anche se interrompi.': ['Keep the app open. Your pages stay saved even if you stop.', '请保持应用打开。即使中断，页面也已保存。', '앱을 열어 두세요. 중단해도 페이지는 저장되어 있습니다.'],
  'Finisco di elaborare le pagine ({n})…': ['Finishing page processing ({n})…', '正在完成页面处理 ({n})…', '페이지 처리를 마무리하는 중 ({n})…'],
  'Preparo il riconoscimento del testo': ['Preparing text recognition', '正在准备文字识别', '텍스트 인식 준비 중'],
  'Riconosco il testo: pagina {i} di {n}': ['Recognizing text: page {i} of {n}', '正在识别文字：第 {i} 页，共 {n} 页', '텍스트 인식 중: {n}페이지 중 {i}페이지'],
  'Impagino: {i} di {n}': ['Laying out pages: {i} of {n}', '正在排版：{i} / {n}', '레이아웃 구성 중: {i} / {n}'],
  'immagini': ['images', '图片', '이미지'],
  'scansione': ['scan', '扫描', '스캔'],
  'PDF pronto': ['PDF ready', 'PDF 已生成', 'PDF 완료'],
  'Immagini pronte': ['Images ready', '图片已生成', '이미지 완료'],
  'Esportazione non riuscita: {e}': ['Export failed: {e}', '导出失败：{e}', '내보내기 실패: {e}'],
  'Pagina non ancora elaborata': ['Page not processed yet', '页面尚未处理完成', '아직 처리되지 않은 페이지입니다'],
  'Questo file non è un backup di Pageturn': ['This file isn’t a Pageturn backup', '此文件不是 Pageturn 备份', '이 파일은 Pageturn 백업이 아닙니다'],
  '{name} (ripristino)': ['{name} (restored)', '{name}（恢复）', '{name} (복원)'],

  // impostazioni
  'Aspetto': ['Appearance', '外观', '화면 모드'],
  'Automatico': ['Automatic', '自动', '자동'],
  'Chiaro': ['Light', '浅色', '밝게'],
  'Scuro': ['Dark', '深色', '어둡게'],
  'Lingua': ['Language', '语言', '언어'],
  'Automatica': ['Automatic', '自动', '자동'],
  'Backup automatico sul server': ['Automatic backup to your server', '自动备份到服务器', '서버로 자동 백업'],
  'Attivo': ['On', '开启', '켜짐'],
  'Indirizzo': ['Address', '地址', '주소'],
  'Codice': ['Code', '访问码', '접속 코드'],
  'facoltativo': ['optional', '可选', '선택'],
  'Stato': ['Status', '状态', '상태'],
  'Verifica connessione': ['Test connection', '测试连接', '연결 테스트'],
  'Ripristina dal server': ['Restore from server', '从服务器恢复', '서버에서 복원'],
  'Ogni foto viene inviata al tuo server appena scattata, così resta una copia anche se perdi il telefono. Il server è incluso nel progetto (cartella server).': ['Every photo is sent to your server as soon as it’s taken, so a copy survives even if you lose your phone. The server is included in the project (server folder).', '每张照片拍下后立即发送到你的服务器，即使手机丢失也留有副本。服务器程序包含在项目中（server 文件夹）。', '촬영한 사진은 즉시 서버로 전송되어, 휴대폰을 잃어버려도 사본이 남습니다. 서버 프로그램은 프로젝트(server 폴더)에 들어 있습니다.'],
  'Archivio sul dispositivo': ['Storage on this device', '设备存储', '기기 저장소'],
  'Spazio usato': ['Space used', '已用空间', '사용 중인 공간'],
  '{used} di {quota}': ['{used} of {quota}', '{used} / {quota}', '{used} / {quota}'],
  'non disponibile': ['not available', '不可用', '사용 불가'],
  'Protetto dalla pulizia': ['Protected from cleanup', '免于自动清理', '자동 정리로부터 보호됨'],
  'sì': ['yes', '是', '예'],
  'non confermato': ['not confirmed', '未确认', '확인되지 않음'],
  'no, installa l’app': ['no, install the app', '否，请安装应用', '아니요, 앱을 설치하세요'],
  'Importa un backup (.zip)': ['Import a backup (.zip)', '导入备份 (.zip)', '백업 가져오기 (.zip)'],
  'Informazioni': ['About', '关于', '정보'],
  'Versione': ['Version', '版本', '버전'],
  'Ambiente': ['Environment', '运行环境', '실행 환경'],
  'Codice sorgente su GitHub': ['Source code on GitHub', 'GitHub 上的源代码', 'GitHub 소스 코드'],
  'Pageturn è open source (licenza GPL-3.0). Le scansioni restano sul tuo dispositivo e sul tuo server: nessun dato passa da altri servizi.': ['Pageturn is open source (GPL-3.0 license). Your scans stay on your device and your server: no data goes through any other service.', 'Pageturn 是开源软件（GPL-3.0 许可证）。扫描内容只保存在你的设备和你的服务器上，不经过任何其他服务。', 'Pageturn은 오픈소스(GPL-3.0 라이선스)입니다. 스캔은 내 기기와 내 서버에만 저장되며, 다른 서비스를 거치지 않습니다.'],
  'Server raggiungibile': ['Server reachable', '服务器连接正常', '서버에 연결됨'],
  'Carica su Google Drive': ['Upload to Google Drive', '上传到 Google Drive', 'Google Drive에 업로드'],
  'ID client OAuth': ['OAuth client ID', 'OAuth 客户端 ID', 'OAuth 클라이언트 ID'],
  'Collegato': ['Connected', '已连接', '연결됨'],
  'Non collegato': ['Not connected', '未连接', '연결 안 됨'],
  'Collega Google': ['Connect Google', '连接 Google', 'Google 연결'],
  'Carico su Google Drive…': ['Uploading to Google Drive…', '正在上传到 Google Drive…', 'Google Drive에 업로드하는 중…'],
  'Caricato su Google Drive': ['Uploaded to Google Drive', '已上传到 Google Drive', 'Google Drive에 업로드했습니다'],
  'Caricamento su Drive non riuscito: {e}': ['Drive upload failed: {e}', 'Drive 上传失败：{e}', 'Drive 업로드 실패: {e}'],
  'Server non raggiungibile: {err}': ['Server unreachable: {err}', '无法连接服务器：{err}', '서버에 연결할 수 없음: {err}'],
  'Importo il backup…': ['Importing backup…', '正在导入备份…', '백업 가져오는 중…'],
  '«{name}» importato': ['“{name}” imported', '已导入“{name}”', '“{name}”을(를) 가져왔습니다'],
  'app installata': ['installed app', '已安装应用', '설치된 앱'],
  'offline sì': ['works offline', '可离线使用', '오프라인 사용 가능'],
  'offline no': ['no offline', '不可离线使用', '오프라인 사용 불가'],
  'OCR multithread': ['multithreaded OCR', '多线程 OCR', '멀티스레드 OCR'],
  'OCR a 1 thread': ['single-thread OCR', '单线程 OCR', '단일 스레드 OCR'],
  'invio in corso ({n})': ['sending ({n})', '正在上传 ({n})', '전송 중 ({n})'],
  'tutto sul server': ['all on the server', '已全部备份到服务器', '모두 서버에 백업됨'],
  'Sul server non ci sono libri': ['There are no books on the server', '服务器上没有书籍', '서버에 책이 없습니다'],
  'Scarico…': ['Downloading…', '正在下载…', '내려받는 중…'],
  'Scarico {i} di {n}…': ['Downloading {i} of {n}…', '正在下载 {i} / {n}…', '{i} / {n} 내려받는 중…'],
  '«{name}» ripristinato': ['“{name}” restored', '已恢复“{name}”', '“{name}”을(를) 복원했습니다'],
  'Ripristino non riuscito: {err}': ['Restore failed: {err}', '恢复失败：{err}', '복원 실패: {err}'],
  '{name} (dal server)': ['{name} (from server)', '{name}（来自服务器）', '{name} (서버)'],
  'Codice di accesso errato': ['Wrong access code', '访问码错误', '접속 코드가 올바르지 않습니다'],
  'Non è un server Pageturn': ['Not a Pageturn server', '不是 Pageturn 服务器', 'Pageturn 서버가 아닙니다'],
  'Errore {status}': ['Error {status}', '错误 {status}', '오류 {status}'],
  'Errore del server ({status})': ['Server error ({status})', '服务器错误 ({status})', '서버 오류 ({status})'],
  'Sei offline': ['You’re offline', '当前处于离线状态', '오프라인 상태입니다'],
  'Progetto non trovato': ['Project not found', '找不到该项目', '프로젝트를 찾을 수 없습니다'],

  // avvio
  'È pronta una nuova versione': ['A new version is ready', '新版本已就绪', '새 버전이 준비되었습니다'],
  'Aggiorna': ['Update', '更新', '업데이트'],
  'Qualcosa non va': ['Something went wrong', '出了点问题', '문제가 발생했습니다'],
};

const COL = { en: 0, zh: 1, ko: 2 };

export function detectLang() {
  const nav = typeof navigator !== 'undefined' ? navigator : {};
  for (const l of nav.languages || [nav.language]) {
    const c = String(l || '').slice(0, 2).toLowerCase();
    if (c === 'it' || c === 'en' || c === 'zh' || c === 'ko') return c;
  }
  return 'en';
}

// 'auto' segue la lingua del telefono; le altre lingue non previste diventano inglese.
export function setLang(p) {
  pref = LOCALES[p] ? p : 'auto';
  lang = pref === 'auto' ? detectLang() : pref;
  try { localStorage.setItem(KEY, pref); } catch { /* privato o worker */ }
  if (typeof document !== 'undefined') document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang;
}

export const langPref = () => pref;
export const currentLang = () => lang;
export const locale = () => LOCALES[lang];
// spazio tra due frasi: in cinese dopo 。 non si lascia spazio
export const sp = () => (lang === 'zh' ? '' : ' ');

export function tr(key, vars) {
  const row = lang === 'it' ? null : T[key];
  let s = (row && row[COL[lang]]) || key;
  if (vars) s = s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));
  return s;
}

export function trp(n, one, many) {
  const row = lang === 'it' ? null : T[`${one}|${many}`];
  if (!row) return `${n} ${n === 1 ? one : many}`;
  const [o, m] = row[COL[lang]];
  return (n === 1 ? o : m).replace('{n}', n);
}

let saved = null;
try { saved = localStorage.getItem(KEY); } catch { /* */ }
setLang(saved || 'auto');
