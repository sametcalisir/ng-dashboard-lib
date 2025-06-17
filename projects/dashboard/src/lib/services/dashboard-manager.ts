import { computed, effect, Injectable, signal } from '@angular/core';
import { Widgets } from '../models/dashboard';
import { Empty } from '../pages/dashboard/widgets/empty/empty';

@Injectable({
  providedIn: 'root',
})
export class DashboardManager {
  // Tüm mevcut widget'ların kataloğu (Add widget butonuna tıklanınca gösterilen componentlerin verileri buradan gönderilmektedir.)
  widgets = signal<Widgets[]>([]);

  // Dışarıdan Widget Ekleme Metodu (Kullanıcı projesinden buraya widget gönderecek)
  registerWidget(widget: Omit<Widgets, 'id'> & { id?: number }): void {
    const newId = this.generateUniqueId(); // Otomatik ID üret (veya kullanıcı kendi ID'sini versin)
    const newWidget: Widgets = {
      ...widget,
      id: widget.id || newId, // Kullanıcı ID vermişse onu kullan, yoksa üretilen ID
    };

    this.widgets.update((current) => [...current, newWidget]);
  }

  // Benzersiz ID üretmek için (ID çakışmasını önler)
  private generateUniqueId(): number {
    const existingIds = this.widgets().map((w) => w.id);
    return Math.max(...existingIds, 0) + 1;
  }

  // Kullanıcının eklediği widget'ların listesi
  addedWidgets = signal<Widgets[]>([
    {
      id: 7,
      content: Empty,
      rows: 5,
      columns: 5,
    },
  ]);

  // Kullanıcının ekleyebileceği widget'ları hesaplar
  // addedWidgets veya widgets değiştiğinde otomatik güncellenir
  widgetsToAdd = computed(() => {
    // Ekli widget'ların ID'lerini bir dizi olarak al
    const addedIds = this.addedWidgets().map((w) => w.id);

    // Tüm widget'lar arasından, ekli olmayanları (ID'si addedIds'de bulunmayanları) filtrele
    return this.widgets().filter((w) => !addedIds.includes(w.id));
  });

  // Yeni widget ekleme metodu (Widget panelinde bulunan componentleri dashboard alanına ekleme işlemi yapar).
  addWidget(w: Widgets) {
    const currentWidgets = this.addedWidgets();
    // Eğer sadece id:7 varsa, onu koru ve yeni widget'ı ekle
    if (currentWidgets.length === 1 && currentWidgets[0].id === 7) {
      this.addedWidgets.set([{ ...w }]); // id:7'yi sil, yeni widget'ı ekle
    } else {
      // Diğer durumlarda id:7'yi sil ve yeni widget'ı ekle
      const newWidgets = currentWidgets.filter((widget) => widget.id !== 7);
      this.addedWidgets.set([...newWidgets, { ...w }]);
    }
  }

  // Widget güncelleme metodu
  updateWidget(id: number, widget: Partial<Widgets>) {
    // Güncellenecek widget'ı id'ye göre bul
    const index = this.addedWidgets().findIndex((w) => w.id === id);
    // Eğer widget bulunduysa
    if (index !== -1) {
      // Mevcut widget listesinin kopyasını oluştur
      const newWidgets = [...this.addedWidgets()];

      // İlgili widget'ı güncelle:
      // 1. Mevcut widget özelliklerini koru
      // 2. Yeni gelen widget özelliklerini üzerine yaz
      newWidgets[index] = { ...newWidgets[index], ...widget };

      // Yeni widget listesini state'e kaydet
      this.addedWidgets.set(newWidgets);
    }
  }

  /**
   * Widget'ı listede bir sonraki pozisyona taşır (sağa kaydırır)
   * id - Taşınacak widget'ın ID'si
   */
  moveWidgetToRight(id: number) {
    // Widget'ın mevcut pozisyonunu bul
    const index = this.addedWidgets().findIndex((w) => w.id === id);

    // Eğer widget zaten en sağda (sondaysa) işlem yapma
    if (index === this.addedWidgets().length - 1) {
      return;
    }

    // Widget listesinin yeni bir kopyasını oluştur
    const newWidgets = [...this.addedWidgets()];

    // Mevcut widget ile bir sonraki widget'ın yerlerini değiştir
    [newWidgets[index], newWidgets[index + 1]] = [
      { ...newWidgets[index + 1] }, // // Sonraki widget'ın kopyası
      { ...newWidgets[index] }, // Mevcut widget'ın kopyası
    ];

    this.addedWidgets.set(newWidgets); // Yeni widget listesini state'e kaydet
  }

  /**
   * Widget'ı listede bir önceki pozisyona taşır (sola kaydırır)
   * id - Taşınacak widget'ın ID'si
   */
  moveWidgetToLeft(id: number) {
    // Widget'ın mevcut pozisyonunu bul
    const index = this.addedWidgets().findIndex((w) => w.id === id);

    // Eğer widget zaten en solda (baştaysa) işlem yapma
    if (index === 0) {
      return;
    }

    // Widget listesinin yeni bir kopyasını oluştur
    const newWidgets = [...this.addedWidgets()];

    // Mevcut widget ile bir önceki widget'ın yerlerini değiştir
    [newWidgets[index], newWidgets[index - 1]] = [
      { ...newWidgets[index - 1] }, // Önceki widget'ın kopyası
      { ...newWidgets[index] }, // Mevcut widget'ın kopyası
    ];

    // Yeni widget listesini state'e kaydet
    this.addedWidgets.set(newWidgets);
  }

  // Widget silme metodu
  removeWidget(id: number) {
    const newWidgets = this.addedWidgets().filter((w) => w.id !== id);

    // Eğer hiç widget kalmadıysa, "Empty" widget'ını ekle
    if (newWidgets.length === 0) {
      this.addedWidgets.set([
        {
          id: 7,
          content: Empty,
          rows: 5,
          columns: 5,
        },
      ]);
    } else {
      this.addedWidgets.set(newWidgets);
    }
  }

  fetchWidgets() {
    const widgetsAsString = localStorage.getItem('dashboardWidgets');
    if (widgetsAsString) {
      const widgets = JSON.parse(widgetsAsString) as Widgets[];
      widgets.forEach((widget) => {
        const content = this.widgets().find((w) => w.id === widget.id)?.content;
        if (content) {
          widget.content = content;
        }
      });

      this.addedWidgets.set(widgets);
    }
  }

  constructor() {
    this.fetchWidgets();
  }

  insertWidgetAtPosition(sourceWidgetId: number, destWidgetId: number) {
    const widgetToAdd = this.widgetsToAdd().find(
      (w) => w.id === sourceWidgetId
    );
    if (!widgetToAdd) return;

    const indexOfDestWidget = this.addedWidgets().findIndex(
      (w) => w.id === destWidgetId
    );
    const positionToAdd =
      indexOfDestWidget === -1 ? this.addedWidgets().length : indexOfDestWidget;

    // id:7'yi filtrele ve yeni widget'ı ekle
    const newWidgets = this.addedWidgets().filter((w) => w.id !== 7);
    newWidgets.splice(positionToAdd, 0, widgetToAdd);
    this.addedWidgets.set(newWidgets);
  }

  // Syncing with Local Storage
  saveWidgets = effect(() => {
    const widgetsWithoutContent: Partial<Widgets>[] = this.addedWidgets().map(
      (w) => ({ ...w })
    );
    widgetsWithoutContent.forEach((w) => {
      delete w.content;
    });

    localStorage.setItem(
      'dashboardWidgets',
      JSON.stringify(widgetsWithoutContent)
    );
  });

  updateWidgetPosition(sourceWidgetId: number, targetWidgetId: number) {
    // Eğer hedef veya kaynak id:7 ise işlem yapma
    if (sourceWidgetId === 7 || targetWidgetId === 7) return;

    const sourceIndex = this.addedWidgets().findIndex(
      (w) => w.id === sourceWidgetId
    );
    if (sourceIndex === -1) return;

    // id:7'yi listeden çıkar
    const filteredWidgets = this.addedWidgets().filter((w) => w.id !== 7);
    const sourceWidget = filteredWidgets.find((w) => w.id === sourceWidgetId);

    if (!sourceWidget) return;

    const targetIndex = filteredWidgets.findIndex(
      (w) => w.id === targetWidgetId
    );
    if (targetIndex === -1) return;

    const newWidgets = [...filteredWidgets];
    newWidgets.splice(sourceIndex, 1); // Kaynak widget'ı çıkar
    newWidgets.splice(targetIndex, 0, sourceWidget); // Yeni pozisyona ekle

    this.addedWidgets.set(newWidgets);
  }
}
