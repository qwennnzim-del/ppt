
import { SlideContent } from './types';

export const SLIDES: SlideContent[] = [
  {
    id: 1,
    title: "Revolusi AI di Dunia Kerja",
    subtitle: "Materi Utama: Transformasi Digital",
    description: "Menjelajahi bagaimana Kecerdasan Buatan (AI) mendefinisikan ulang cara kita bekerja, berkolaborasi, dan menciptakan nilai di era modern.",
    accent: "from-blue-600 to-indigo-600",
    animationType: 'fade-up',
    layoutType: 'focus',
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: 2,
    title: "Automasi Tugas Repetitif",
    subtitle: "Efisiensi & Akurasi",
    description: "AI mengambil alih pekerjaan administratif, membebaskan manusia untuk fokus pada tugas kreatif dan pengambilan keputusan strategis.",
    accent: "from-purple-600 to-pink-500",
    animationType: 'side-l',
    layoutType: 'split',
    image: "https://images.unsplash.com/photo-1518186239717-2e9c140c797a?auto=format&fit=crop&q=80&w=1200",
    stats: [
      { label: "Efisiensi", value: "40%" },
      { label: "Reduksi Error", value: "99%" }
    ]
  },
  {
    id: 3,
    title: "Munculnya Peran Baru",
    subtitle: "Evolusi Karier",
    description: "Lahirnya profesi baru seperti AI Prompt Engineer dan Spesialis Etika AI yang sebelumnya tidak pernah ada.",
    accent: "from-emerald-500 to-teal-400",
    animationType: 'corner-tl',
    layoutType: 'modern',
    image: "https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=1200",
    features: ["Prompt Engineering", "AI Ethical Audit"]
  },
  {
    id: 4,
    title: "Produktivitas Maksimal",
    subtitle: "Human-AI Copilot",
    description: "Penggunaan AI sebagai Copilot memungkinkan penyelesaian proyek 2x lebih cepat dari metode tradisional.",
    accent: "from-orange-500 to-amber-600",
    animationType: 'zoom-in',
    layoutType: 'focus',
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: 5,
    title: "Reskilling & Upskilling",
    subtitle: "Adaptasi Berkelanjutan",
    description: "Urgensi bagi tenaga kerja untuk mempelajari keterampilan baru agar tetap relevan di pasar kerja global.",
    accent: "from-rose-500 to-red-600",
    animationType: 'side-r',
    layoutType: 'split',
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200",
    stats: [
      { label: "Skill Gap", value: "54%" },
      { label: "Target", value: "1B Users" }
    ]
  },
  {
    id: 6,
    title: "Kolaborasi Manusia-Mesin",
    subtitle: "Augmented Intelligence",
    description: "Kreativitas manusia dipadukan dengan kecepatan data AI untuk hasil yang superior.",
    accent: "from-cyan-400 to-blue-500",
    animationType: 'corner-br',
    layoutType: 'modern',
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1200",
    features: ["Human Creativity", "Machine Speed"]
  },
  {
    id: 7,
    title: "Tantangan Etika",
    subtitle: "Regulasi & Privasi",
    description: "Memahami risiko bias algoritma dan perlindungan data sensitif dalam integrasi AI korporasi.",
    accent: "from-slate-600 to-slate-800",
    animationType: 'side-l',
    layoutType: 'split',
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200",
    stats: [
      { label: "Compliances", value: "GDPR+" },
      { label: "Security", value: "A+" }
    ]
  },
  {
    id: 8,
    title: "Masa Depan Strategis",
    subtitle: "Langkah Strategis",
    description: "AI adalah alat, bukan ancaman. Kunci kesuksesan adalah keterbukaan terhadap inovasi.",
    accent: "from-violet-600 to-fuchsia-600",
    animationType: 'fade-up',
    layoutType: 'focus',
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200"
  }
];
