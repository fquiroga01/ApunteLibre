import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { TermsPage } from '../terms/terms.page';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, NavbarComponent]
})
export class RegisterPage implements OnInit {
  registerForm!: FormGroup;
  users: any[] = [];

  regiones: string[] = [
    'Arica y Parinacota', 'Tarapacá', 'Antofagasta', 'Atacama',
    'Coquimbo', 'Valparaíso', 'Metropolitana', 'O’Higgins',
    'Maule', 'Ñuble', 'Biobío', 'La Araucanía', 'Los Ríos',
    'Los Lagos', 'Aysén', 'Magallanes'
  ];

  comunasPorRegion: { [key: string]: string[] } = {
    'Arica y Parinacota': ['Arica', 'Putre', 'Camarones', 'General Lagos'],
    'Tarapacá': ['Iquique', 'Alto Hospicio', 'Pozo Almonte', 'Camiña', 'Colchane', 'Huara', 'Pica'],
    'Antofagasta': ['Antofagasta', 'Mejillones', 'Sierra Gorda', 'Taltal', 'Calama', 'Ollagüe', 'San Pedro de Atacama', 'Tocopilla', 'Maria Elena'],
    'Atacama': ['Copiapó', 'Caldera', 'Tierra Amarilla', 'Chañaral', 'Diego de Almagro', 'Vallenar', 'Alto del Carmen', 'Freirina', 'Huasco'],
    'Coquimbo': ['La Serena', 'Coquimbo', 'Andacollo', 'La Higura', 'Paihuano', 'Vicuña', 'Illapel', 'Canela', 'Los Vilos', 'Salamanca', 'Ovalle', 'Combarbalá','Monte Patria', 'Punitaqui', 'Río Hurtado'],
    'Valparaíso': ['Valparaíso', 'Casablanca', 'Concón', 'Juan Fernández', 'Puchuncaví', 'Quintero', 'Viña del Mar', 'Isla de Pascua', 'Los Andes', 'Calle Larga', 'Rinconada', 'San Esteban', 'La Ligua', 'Cabildo', 'Papudo', 'Petorca', 'Zapallar', 'Quillota', 'La Calera', 'Hijuelas', 'La Cruz', 'Nogales', 'San Antonio', 'Algarrobo', 'Cartagena', 'El Quisco', 'El Tabo', 'Santo Domingo', 'San Felipe', 'Catemu', 'Llay-Llay', 'Panquehue', 'Putaendo', 'Santa María', 'Quilpué', 'Limache', 'Olmué', 'Villa Alemana'],
    'Metropolitana': ['Santiago', 'Cerrillos', 'Cerro Navia', 'Conchalí', 'El Bosque', 'Estación Central', 'Huechuraba', 'Independencia', 'La Cisterna', 'La Florida', 'La Granja', 'La Pintana', 'La Reina', 'Las Condes', 'Lo Barnechea', 'Lo Espejo', 'Lo Prado', 'Macul', 'Maipú', 'Ñuñoa', 'Pedro Aguirre Cerda', 'Peñalolén', 'Providencia', 'Pudahuel', 'Quilicura', 'Quinta Normal', 'Recoleta', 'Renca', 'San Joaquín', 'San Miguel', 'San Ramón', 'Vitacura', 'Puente Alto', 'Pirque', 'San José de Maipo', 'Colina', 'Lampa', 'Til Til', 'San Bernardo', 'Buin', 'Calera de Tango', 'Paine', 'Melipilla', 'Alhué', 'Curacaví', 'María Pinto', 'San Pedro', 'Talagante', 'El Monte', 'Isla de Maipo', 'Padre Hurtado', 'Peñaflor'],
    'OHiggins': ['Rancagua', 'Codegua', 'Coinco', 'Coltauco', 'Doñihue', 'Graneros', 'Las Cabras', 'Machalí', 'Malloa', 'Mostazal', 'Olivar', 'Peumo', 'Pichidegua', 'Quinta de Tilcoco', 'Rengo', 'Requinoa', 'San Vicente', 'Pichilemu', 'La Estrella', 'Litueche', 'Marchigüe', 'Navidad', 'Paredones', 'San Fernando', 'Chépica', 'Chimbarongo', 'Lolol', 'Nancagua', 'Palmilla', 'Peralillo', 'Placilla', 'Pumanque', 'Santa Cruz'],
    'Maule': ['Talca', 'Constitución', 'Curepto', 'Empedrado', 'Maule', 'Pelarco', 'Pencahue', 'Río Claro', 'San Clemente', 'San Rafael', 'Cauquenes', 'Chanco', 'Pelluhue', 'Curicó', 'Hualañé', 'Licantén', 'Molina', 'Rauco', 'Romeral', 'Sagrada Familia', 'Teno', 'Vichuquén', 'Linares', 'Colbún', 'Longaví', 'Parral', 'Retiro', 'San Javier', 'Villa Alegre', 'Yerbas Buenas'],
    'Ñuble': ['Chillán', 'Bulnes', 'Chillán Viejo', 'El Carmen', 'Pemuco', 'Pinto', 'Quillón', 'San Ignacio', 'Yungay', 'Quirihue', 'Cobquecura', 'Coelemu', 'Ninhue','Portezuelo', 'Ránquil', 'Treguaco', 'San Carlos', 'Coihueco', 'Ñiquén', 'San Fabián', 'San Nicolás'],
    'Biobío': ['Concepción', 'Coronel', 'Chiguayante', 'Florida', 'Hualqui', 'Lota', 'Penco', 'San Pedro de La Paz', 'Santa Juana', 'Talcahuano', 'Tomé', 'Hualpén', 'Lebu', 'Arauco', 'Cañete', 'Contulmo', 'Curanilahue', 'Los Álamos', 'Tirúa', 'Los Ángeles', 'Antuco', 'Cabrero', 'Laja', 'Mulchén', 'Nacimiento', 'Negrete', 'Quilaco', 'Quilleco', 'San Rosendo', 'Santa Bárbara', 'Tucapel', 'Yumbel', 'Alto Biobío'],
    'La Araucanía': ['Temuco', 'Carahue', 'Cunco', 'Curarrehue', 'Freire', 'Galvarino', 'Gorbea', 'Lautaro', 'Loncoche', 'Melipeuco', 'Nueva Imperial', 'Padre Las Casas', 'Perquenco', 'Pitrufquén', 'Pucón', 'Saavedra', 'Teodoro Schmidt', 'Toltén', 'Vilcún', 'Villarica', 'Cholchol', 'Angol', 'Collipulli', 'Curacautín', 'Ercilla', 'Lonquimay', 'Los Sauces', 'Lumaco', 'Purén', 'Renaico', 'Traiguén', 'Victoria'],
    'Los Ríos': ['Valdivia', 'Corral', 'Lanco', 'Los Lagos', 'Máfil', 'Mariquina', 'Paillaco', 'Panguipulli', 'La Unión', 'Futrono', 'Lago Ranco', 'Río Bueno'],
    'Los Lagos': ['Puerto Montt', 'Calbuco', 'Cochamó', 'Fresia', 'Frutillar', 'Los Muermos', 'Llanquihue', 'Maullín', 'Puerto Varas', 'Castro', 'Ancud', 'Chonchi', 'Curaco de Vélez', 'Dalcahue', 'Puqueldón', 'Queilén', 'Quellón', 'Quemchi', 'Quinchao', 'Osorno', 'Puerto Octay', 'Purranque', 'Puyehue', 'Río Negro', 'San Juan de la Costa', 'San Pablo', 'Chaitén', 'Futaleufú', 'Hualaihué', 'Palena'],
    'Aysén': ['Coyhaique', 'Lago Verde', 'Aysén', 'Cisnes', 'Guaitecas', 'Cochrane', 'OHiggins', 'Tortel', 'Chile Chico', 'Río Ibáñez'],
    'Magallanes': ['Punta Arenas', 'Laguna Blanca', 'Río Verde', 'San Gregorio', 'Cabo de Hornos', 'Antártica', 'Porvenir', 'Primavera', 'Timaukel', 'Natales', 'Torres del Paine']
  };

  comunasFiltradas: string[] = [];

  constructor(private fb: FormBuilder, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      rut: ['', [Validators.required, Validators.pattern(/^\d{7,8}-[0-9kK]{1}$/)]],
      email: ['', [Validators.required, Validators.email]],
      region: ['', Validators.required],
      comuna: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    }, { validators: this.passwordMatchValidator });
  }

  get f() { return this.registerForm.controls; }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return password === confirm ? null : { mismatch: true };
  }

  filtrarComunas() {
    const region = this.registerForm.value.region;
    this.comunasFiltradas = region ? this.comunasPorRegion[region] : [];
    this.registerForm.patchValue({ comuna: '' });
  }

  async openTerms() {
    const modal = await this.modalCtrl.create({ component: TermsPage });
    await modal.present();
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const newUser = {
        id: 'user_' + Date.now(),
        username: this.registerForm.value.username,
        password: this.registerForm.value.password,
        email: this.registerForm.value.email,
        role: 'user',
        region: this.registerForm.value.region,
        comuna: this.registerForm.value.comuna
      };

      this.users.push(newUser);
      localStorage.setItem('userProfile', JSON.stringify(newUser));

      console.log('✅ Registro exitoso:', newUser);
      this.registerForm.reset();
    } else {
      console.log('❌ Formulario inválido');
    }
  }
}
